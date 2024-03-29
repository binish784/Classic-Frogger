class Lane{
  constructor(lane_id,game){
    this.grid=50;
    this.grids=[];
    this.game=game;
    this.height=50;
    this.enemies=[];
    this.lane_id=lane_id;
    this.last_id=undefined;
    this.GAME_WIDTH=game.GAME_WIDTH;
    this.y=this.lane_id*this.height;
    this.enemy_width=randomNumber(80,140);
    this.last_enemy=randomNumber(100,450);
    this.enemies_gap=randomNumber(300,500);
    this.left_lane=true;
    this.speed=0;
  }

  initialize(ctx){
    let danger=false;
    let grid_color=undefined;
    for(let i=0;i<11;i++){
      if(this.game.safeLanes.indexOf(this.lane_id)>0){
        grid_color="grey";
        danger=false;
      }else if((i%2==1 && this.lane_id==0)){
          danger=false;
          grid_color="darkseagreen";
      }else if(this.lane_id>=this.game.dividerLane){
        grid_color="#c7c7c7";
        danger=false
      }else{
          danger=true;
          grid_color="skyblue";
        }
        this.grids.push(new Grid(i*this.grid,this.y,danger, grid_color));
      }

    if(this.lane_id<this.game.dividerLane && this.lane_id!=0 && this.lane_id!=1){
      if(this.game.lanes[this.lane_id-1].left_lane===this.left_lane){
        this.left_lane=!(this.left_lane);
      }
    }else{
      this.left_lane=(randomNumber(0,10)<5) ? true : false;
    }
    this.speed=(this.left_lane) ? -randomNumber(2,5) : randomNumber(2,5);
  }

  generateEnemies(){
    let mountable_enemies= (this.lane_id<this.game.dividerLane) ? true : false;
    if(this.game.safeLanes.indexOf(this.lane_id)<0){
      let last_enemy=randomNumber(0,600);
      for(let i=0;i<4;i++){
        if(this.left_lane){
          if(i==0) this.enemies.push(new Enemy(this.last_enemy,this.enemy_width,this,mountable_enemies));
          else this.enemies.push(new Enemy(this.last_enemy+this.enemy_width+this.enemies_gap,this.enemy_width,this,mountable_enemies));
        }else{
          if(i==0) this.enemies.push(new Enemy(this.last_enemy,this.enemy_width,this,mountable_enemies));
          else this.enemies.push(new Enemy(this.last_enemy-this.enemy_width-this.enemies_gap,this.enemy_width,this,mountable_enemies));
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
      this.grids.forEach(function(grid){
        grid.render(ctx);
        // grid.renderText(ctx);
      }.bind(this));
    this.enemies.forEach(function(e){
      e.render(ctx);
    })

  }

}
