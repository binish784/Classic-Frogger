class Enemy{
  constructor(initial_x,width,lane,mountable){
    this.lane=lane;
    this.height=40;
    this.width=width;
    this.speed=this.lane.speed;
    this.GAME_WIDTH=lane.GAME_WIDTH;
    this.colors=["darkkhaki","cornflowerblue","teal",];
    this.position={
      x:initial_x,
      y:this.lane.y+((this.lane.height-this.height)/2)
    }
    this.canBeMounted=false || mountable;
    this.color=this.canBeMounted ? "burlywood " : this.colors[randomNumber(0,4)]
  }

  render(ctx){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    // ctx.fillStyle="white";
    // ctx.fillText((this.canBeMounted) ? "Mount" : "Danger",this.position.x+this.width/2-5,this.position.y+this.height/2);
  }

  update(){
    this.position.x+=this.speed;
    if(this.lane.left_lane){
      if(this.position.x+this.width<0){
        this.position.x=this.lane.last.position.x+this.lane.enemies_gap;
        this.lane.last=this;
      }
    }else{
      if(this.position.x>this.GAME_WIDTH){
        this.position.x=this.lane.last.position.x-this.lane.enemies_gap;
        this.lane.last=this;
      }
    }
  }
}
