class Enemy{
  constructor(initial_x,width,lane){
    this.lane=lane;
    this.height=40;
    this.width=width;
    this.speed=this.lane.speed;
    this.GAME_WIDTH=lane.GAME_WIDTH;
    this.colors=["red","maroon","yellow","grey","blue","teal"];
    this.color=this.colors[randomNumber(0,7)];
    this.position={
      x:initial_x,
      y:this.lane.y+((this.lane.height-this.height)/2)
    }
  }

  render(ctx){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
  }

  update(){
    if(this.lane.left_lane){
      this.position.x-=this.speed;
      if(this.position.x+this.width<0){
        this.position.x=this.lane.last.position.x+this.lane.enemies_gap;
        this.lane.last=this;
      }
    }else{
      this.position.x+=this.speed;
      if(this.position.x>this.GAME_WIDTH){
        this.position.x=this.lane.last.position.x-this.lane.enemies_gap;
        this.lane.last=this;
      }
    }
  }
}
