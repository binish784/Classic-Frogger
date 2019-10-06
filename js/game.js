class Game{
  constructor(ctx,game_width,game_height){
    this.ctx=ctx;
    this.lanes=[];
    this.lane_height=50;
    this.GAME_WIDTH=game_width;
    this.GAME_HEIGHT=game_height;
    this.num_of_lanes=this.GAME_WIDTH/this.lane_height;
    this.frog=new Frog(this);
    this.currentState=GAME_STATES.RUNNING;
  }

  initialize(){
    this.generateLanes();
  }

  generateLanes(){
    for(let i=0;i<this.num_of_lanes;i++){
      this.lanes.push(new Lane(i,this.GAME_WIDTH));
      this.lanes[i].generateEnemies();
    }
  }

  update(){
    if(this.currentState!=GAME_STATES.RUNNING) return;

    this.frog.update();
    for(let i=0;i<this.num_of_lanes;i++){
      this.lanes[i].update();
    }
  }

  render(){
    if(this.currentState!=GAME_STATES.RUNNING) return;

    this.ctx.clearRect(0,0,this.GAME_WIDTH,this.GAME_HEIGHT);
    for(let i=0;i<this.num_of_lanes;i++){
      this.lanes[i].render(this.ctx);
    }
    this.frog.render(this.ctx);


  }


}
