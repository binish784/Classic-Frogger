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
    this.GAME_WIDTH=game.GAME_WIDTH;
    this.GAME_HEIGHT=game.GAME_HEIGHT;
  }

  moveLeft(){
    if(this.position.x>0){
      this.position.x-=this.grid;
    }
  }

  moveRight(){
    if(this.position.x+this.width<this.GAME_WIDTH){
      this.position.x+=this.grid;
    }
  }

  moveUp(){
    if(this.position.y>0){
      this.position.y-=this.grid;
    }
  }

  moveDown(){
    if(this.position.y+this.height<this.GAME_HEIGHT){
      this.position.y+=this.grid;
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
    }.bind(this))
  }

  update(){
    this.killed();
  }

  render(ctx){
    ctx.fillStyle="Green";
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }
}
