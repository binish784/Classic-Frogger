class Game{
  constructor(ctx,game_width,game_height){
    this.score=0;
    this.ctx=ctx;
    this.lanes=[];
    this.dividerLane=5;
    this.lane_height=50;
    this.safeLanes=[0,5,11];
    this.GAME_WIDTH=game_width;
    this.GAME_HEIGHT=game_height;
    this.frogs=[new Frog(this)];
    this.currentState=GAME_STATES.MENU;
    this.num_of_lanes=this.GAME_WIDTH/this.lane_height;
  }

  restart(){
    this.generateLanes();
    this.frogs=[new Frog(this)];
    this.currentState=GAME_STATES.RUNNING;
    controller.initialize();
  }

  start(){
    this.generateLanes();
    this.frogs=[new Frog(this)];
    this.currentState=GAME_STATES.MENU;
    controller.initialize();
  }

  nextFrog(){
    let frog_num=this.frogs.length-1;
    let current_frog=this.frogs[frog_num];
    this.lanes[0].grids.forEach(function(grid){
      if(current_frog.current_lane==0 &&
         current_frog.position.x>grid.position.x &&
         current_frog.position.x<grid.position.x+grid.width && !grid.danger){
          grid.occupied=true;
          this.frogs.push(new Frog(this));
          controller.changeFrog();
          this.score+=50;
      }
    }.bind(this))
    if(this.frogs.length>5){
      this.restart();
    }
  }


  generateLanes(){
    this.lanes=[];
    for(let i=0;i<=this.num_of_lanes;i++){
      this.lanes.push(new Lane(i,this));
      this.lanes[i].initialize(this.ctx);
      this.lanes[i].generateEnemies();
    }
  }

  update(){
    if(this.currentState!=GAME_STATES.RUNNING) return;
    this.frogs.forEach(function(frog){
      frog.update();
    })
    for(let i=0;i<=this.num_of_lanes;i++){
      this.lanes[i].update();
    }
    this.nextFrog();
  }

  renderScore(){
    this.ctx.fillStyle="black";
    this.ctx.fillText(`Score: ${this.score}`,245,25);
  }

  render(){

    this.ctx.clearRect(0,0,this.GAME_WIDTH,this.GAME_HEIGHT);


    for(let i=0;i<=this.num_of_lanes;i++){
      this.lanes[i].render(this.ctx);
    }
    this.frogs.forEach(function(frog){
      frog.render(this.ctx);
    }.bind(this))

    this.renderScore();


    if(this.currentState==GAME_STATES.GAMEOVER){
      this.ctx.fillStyle=("#000000bd");
      this.ctx.fillRect(0,0,this.GAME_WIDTH,this.GAME_HEIGHT);
      this.ctx.fillStyle="white";
      this.ctx.font="30px Arial";
      this.ctx.fillText("GAMEOVER",200,225);
      this.ctx.fillStyle="white";
      this.ctx.font="20px Arial";
      this.ctx.fillText("Press Space to restart",180,300);
    }

    if(this.currentState==GAME_STATES.MENU){
      this.ctx.fillStyle=("#000000bd");
      this.ctx.fillRect(0,0,this.GAME_WIDTH,this.GAME_HEIGHT);
      this.ctx.fillStyle="white";
      this.ctx.font="20px Arial";
      this.ctx.fillText("Press Space to start",180,300);
    }

  }

}
