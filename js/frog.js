class Frog{
  constructor(game){

    this.speed=0;
    this.grid=50;
    this.width=30;
    this.height=30;

    this.position={
      x:250+(this.grid-this.width)/2,
      y:550+(this.grid-this.height)/2
    }

    this.game=game;
    this.step=undefined;
    this.isMounted=false;
    this.current_lane=11;
    this.GAME_WIDTH=game.GAME_WIDTH;
    this.GAME_HEIGHT=game.GAME_HEIGHT;
    this.current_grid=Math.floor(this.position.x/this.grid);
    this.color="white";
    this.MOVEMENT={
      LEFT:0,
      RIGHT:1,
      UP:2,
      DOWN:3
    }

  }

  move(speed){
    if((this.position.x-this.width/2)>0 && (this.position.x+this.width+this.width/2)<this.GAME_WIDTH){
      this.position.x+=speed;
    }
  }

  checkOccupied(movement){
    let occupied=false;
    let next_lane=this.current_lane;
    let next_grid=this.current_grid;
    switch (movement) {
      case 0:
        next_grid=this.current_grid-1;
        break;
      case 1:
        next_grid=this.current_grid+1;
        break;
      case 2:
        next_lane=this.current_lane-1;
        break;
      case 3:
        next_lane=this.current_lane+1;
        break;
    }
    let lane=this.game.lanes[next_lane];
    occupied=this.game.lanes[next_lane].grids[next_grid].occupied;
    return occupied;
  }

  moveLeft(){
    if(this.position.x-this.grid>0 && !this.checkOccupied(this.MOVEMENT.LEFT)){
      this.step=this.MOVEMENT.LEFT;
    }
  }

  moveRight(){
    if(this.position.x+this.grid<this.GAME_WIDTH && !this.checkOccupied(this.MOVEMENT.RIGHT)){
      this.step=this.MOVEMENT.RIGHT;
    }
  }

  moveUp(){
    if(this.position.y-this.grid>0  && !this.checkOccupied(this.MOVEMENT.UP)){
      this.step=this.MOVEMENT.UP;
    }
  }

  moveDown(){
    if(this.position.y+this.grid<this.game.GAME_HEIGHT  && !this.checkOccupied(this.MOVEMENT.DOWN)){
      this.step=this.MOVEMENT.DOWN;
    }
  }


  collide(){
    let lane=this.game.lanes[this.current_lane];
      lane.enemies.forEach(function(enemy){
        if (this.position.x < enemy.position.x + enemy.width &&
          this.position.x + this.width > enemy.position.x &&
           this.position.y < enemy.position.y + enemy.height &&
           this.position.y + this.height > enemy.position.y) {
             //after enemy collision
            if(!enemy.canBeMounted){
              this.game.currentState=GAME_STATES.GAMEOVER;
            }else{
              this.isMounted=true;
              this.move(enemy.speed);
            }
          }
      }.bind(this))
      lane.grids.forEach(function(grid){
        if(this.position.x>grid.position.x && this.position.x<grid.position.x+grid.width && grid.danger && !this.isMounted){
          this.game.currentState=GAME_STATES.GAMEOVER;
        }
      }.bind(this))
      this.isMounted=false;
  }

  update(){
    if(this.step!=undefined){
        this.current_grid=Math.floor(this.position.x/this.grid);
        switch (this.step) {
          case this.MOVEMENT.LEFT:
            this.current_grid-=1;
            break;
          case this.MOVEMENT.RIGHT:
            this.current_grid+=1;
            break;
          case this.MOVEMENT.UP:
            this.current_lane-=1;
            this.position.y=this.grid*this.current_lane+(this.grid-this.height)/2;
            break;
          case this.MOVEMENT.DOWN:
            this.current_lane+=1;
            this.position.y=this.grid*this.current_lane+(this.grid-this.height)/2;
            break;
        }
        this.position.x=this.grid*this.current_grid+(this.grid-this.width)/2;
        this.current_grid=Math.floor(this.position.x/this.grid);
        this.step=undefined;
    }
    this.collide();
  }

  render(ctx){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }
}
