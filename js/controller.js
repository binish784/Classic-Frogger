class Controller{
  constructor(game){
    this.game=game;
    this.frog=game.frogs[game.frogs.length-1];
    this.moveLock=false;
    window.addEventListener("keydown",function(e){
      if(!this.moveLock){
        switch (e.keyCode) {
          case 37:
            this.frog.moveLeft();
            break;
          case 39:
            this.frog.moveRight();
            break;
          case 38:
            this.frog.moveUp();
            break;
          case 40:
            this.frog.moveDown();
            break;
          case 32:
            if(this.game.currentState==GAME_STATES.GAMEOVER || this.game.currentState==GAME_STATES.MENU){
              console.log("Restart Game");
              this.game.restart();
              break;
            }
        }
        this.moveLock=true;
      }
    }.bind(this));
    window.addEventListener("keyup",function(e){
      this.moveLock=false;
    }.bind(this))
  }

  initialize(){
    this.frog=this.game.frogs[game.frogs.length-1];
  }

  changeFrog(){
    this.frog=this.game.frogs[this.game.frogs.length-1];
  }

}
