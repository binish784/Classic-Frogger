class Lane{
  constructor(lane_id,game_width){
    this.speed=randomNumber(2,5);
    this.height=50;
    this.enemies=[];
    this.enemy_width=80;
    this.lane_id=lane_id;
    this.GAME_WIDTH=game_width;
    this.y=this.lane_id*this.height;
    this.last_id=undefined;
    this.last_enemy=randomNumber(100,450);
    this.enemies_gap=randomNumber(300,500);
    this.left_lane=randomNumber(0,10) <5 ? true : false;
  }

  markSafe(ctx,text){
    ctx.fillStyle= ("Black");
    ctx.fillText(text,70,this.y+this.height/2);
  }

  generateEnemies(){
    if(this.lane_id!=0 && this.lane_id!=5 && this.lane_id!=11){
      let last_enemy=randomNumber(0,600);
      for(let i=0;i<4;i++){
        if(this.left_lane){
          if(i==0) this.enemies.push(new Enemy(this.last_enemy,this.enemy_width,this));
          else this.enemies.push(new Enemy(this.last_enemy+this.enemy_width+this.enemies_gap,this.enemy_width,this));
        }else{
          if(i==0) this.enemies.push(new Enemy(this.last_enemy,this.enemy_width,this));
          else this.enemies.push(new Enemy(this.last_enemy-this.enemy_width-this.enemies_gap,this.enemy_width,this));
        }
        this.last_enemy=this.enemies[i].position.x;
      }
    }
    this.last=this.enemies[3];
  }

  update(){
    this.enemies.forEach(function(e,index){
      e.update();
    })
  }

  render(ctx){
    this.enemies.forEach(function(e){
      e.render(ctx);
    })
    let text="";
    if(this.lane_id==0 || this.lane_id==5 || this.lane_id==11){
      switch (this.lane_id) {
        case 11:
          text="Start Lane";
          break;
        case 5:
          text="Safe Lane";
          break;
        case 0:
          text="Destination Lane";
          break;
      }
      this.markSafe(ctx,text);
    }
  }

}
