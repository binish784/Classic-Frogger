class Game{
  constructor(ctx,game_width,game_height){
    this.ctx=ctx;
    this.lanes=[];
    this.lane_height=50;
    this.dividerLane=5;
    this.GAME_WIDTH=game_width;
    this.GAME_HEIGHT=game_height;
    this.num_of_lanes=this.GAME_WIDTH/this.lane_height;
    this.frogs=[new Frog(this)];
    this.currentState=GAME_STATES.RUNNING;
    this.safeLanes=[0,5,11];
  }

  initialize(){
    this.generateLanes();

  }

  nextFrog(){
    let frog_num=this.frogs.length-1;
    let current_frog=this.frogs[frog_num];
    this.lanes[0].grids.forEach(function(grid){
      if(current_frog.current_lane==0 &&
         current_frog.position.x>grid.position.x &&
         current_frog.position.x<grid.position.x+grid.width &&
        !grid.danger){
          grid.occupied=true;
          this.frogs.push(new Frog(this));
          controller.changeFrog();
      }
    }.bind(this))
  }


  generateLanes(){
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

  render(){
    this.ctx.clearRect(0,0,this.GAME_WIDTH,this.GAME_HEIGHT);
    for(let i=0;i<=this.num_of_lanes;i++){
      this.lanes[i].render(this.ctx);
    }
    this.frogs.forEach(function(frog){
      frog.render(this.ctx);
    }.bind(this))
  }

}
