class Grid{
  constructor(x_pos,y_pos,danger,color){

    this.width=50;
    this.height=50;
    this.color=color || "white";
    this.occupied=false;
    this.danger=false || danger;

    this.position = {
      x:x_pos,
      y:y_pos
    }

  }

  renderText(ctx){
    ctx.fillStyle="black";
    ctx.font="15px Arial";
    if(this.danger){
      ctx.fillText("Danger",this.position.x+this.width/2 -20,this.position.y+this.height/2);
    }else{
      ctx.fillText("Safe",this.position.x+this.width/2 -10,this.position.y+this.height/2);
    }
  }

  render(ctx){
    ctx.fillStyle=this.color;
    ctx.fillRect(this.position.x,this.position.y,this.height,this.width);
  }
}
