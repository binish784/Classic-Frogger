class Frog{
  constructor(game){
    this.game=game;
    this.width=30;
    this.height=30;
    this.grid=50;
    this.position={
      x:250+(this.grid-this.width)/2,
      y:550+(this.grid-this.height)/2
    }
    this.current_lane=11;
    this.GAME_WIDTH=game.GAME_WIDTH;
    this.GAME_HEIGHT=game.GAME_HEIGHT;
    this.step=undefined;
    this.MOVEMENT={
      LEFT:0,
      RIGHT:1,
      UP:2,
      DOWN:3
    }
  }

  moveLeft(){
    if(this.position.x-this.grid>0){
      this.step=this.MOVEMENT.LEFT;
      // this.position.x-=this.grid;
    }
  }

  moveRight(){
    if(this.position.x+this.grid<this.GAME_WIDTH){
      // this.position.x+=this.grid;
      this.step=this.MOVEMENT.RIGHT;
    }
  }

  moveUp(){
    if(this.position.y-this.grid>0){
      this.current_lane-=1;
      // this.position.y-=this.grid;
      this.step=this.MOVEMENT.UP;
    }
  }

  moveDown(){
    if(this.position.y+this.grid<this.GAME_HEIGHT){
      this.current_lane+=1;
      // this.position.y+=this.grid;
      this.step=this.MOVEMENT.DOWN;
    }
  }

  killed(){
    this.game.lanes.forEach(function(lane){
      lane.enemies.forEach(function(enemy){
        if (this.position.x < enemy.position.x + enemy.width &&
          this.position.x + this.width > enemy.position.x &&
           this.position.y < enemy.position.y + enemy.height &&
           this.position.y + this.height > enemy.position.y) {
            this.game.currentState=GAME_STATES.GAMEOVER;
          }
      }.bind(this))
      lane.grids.forEach(function(grid){
        if(this.current_lane==0 && this.position.x>grid.position.x && this.position.x<grid.position.x+grid.width && grid.danger){
          this.game.currentState=GAME_STATES.GAMEOVER;
        }
      }.bind(this))
    }.bind(this))
  }


  update(){
    if(this.step!=undefined){
        switch (this.step) {
          case this.MOVEMENT.LEFT:
            this.position.x-=this.grid;
            break;
          case this.MOVEMENT.RIGHT:
            this.position.x+=this.grid;
            break;
          case this.MOVEMENT.UP:
            this.position.y-=this.grid;
            break;
          case this.MOVEMENT.DOWN:
            this.position.y+=this.grid;
            break;
        }
        this.step=undefined;
    }
    this.killed();
  }

  render(ctx){
    ctx.fillStyle="Green";
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }
}
