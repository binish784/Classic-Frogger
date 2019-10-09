class Frog{
  constructor(game){
    this.game=game;
    this.width=30;
    this.height=30;
    this.grid=50;
    this.speed=0;
    this.position={
      x:250+(this.grid-this.width)/2,
      y:550+(this.grid-this.height)/2
    }
    this.current_grid=Math.floor(this.position.x/this.grid);
    this.current_lane=11;
    this.GAME_WIDTH=game.GAME_WIDTH;
    this.GAME_HEIGHT=game.GAME_HEIGHT;
    this.step=undefined;
    this.isMounted=false;
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
    switch (movement) {
      case 0:
        occupied=this.game.lanes[this.current_lane].grids[this.current_grid-1].occupied;
        break;
      case 1:
        occupied=this.game.lanes[this.current_lane].grids[this.current_grid+1].occupied;
        break;
      case 2:
        occupied=this.game.lanes[this.current_lane-1].grids[this.current_grid].occupied;
        break;
      case 3:
        occupied=this.game.lanes[this.current_lane+1].grids[this.current_grid].occupied;
        break;
    }
    console.log(this.current_lane,this.current_grid);
    console.log(occupied);
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
    if(this.position.y+this.grid<this.GAME_HEIGHT  && !this.checkOccupied(this.MOVEMENT.DOWN)){
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
              this.move(enemy.speed);
            }
          }
      }.bind(this))
      lane.grids.forEach(function(grid){
        if(this.current_lane==0 && this.position.x>grid.position.x && this.position.x<grid.position.x+grid.width && grid.danger){
          this.game.currentState=GAME_STATES.GAMEOVER;
        }
      }.bind(this))
  }

  update(){
    if(this.step!=undefined){
        this.current_grid=Math.floor(this.position.x/this.grid);
        console.log(this.current_grid);
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
    ctx.fillStyle="darkgreen";
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }
}
