class Controller{
  constructor(game){
    this.frog=game.frog;
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
        }
        this.moveLock=true;
      }
    }.bind(this));
    window.addEventListener("keyup",function(e){
      this.moveLock=false;
    }.bind(this))
  }
}
