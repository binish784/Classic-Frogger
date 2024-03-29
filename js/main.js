const GAME_WIDTH=550;
const GAME_HEIGHT=600;
const FRAME_RATE=1000/30;

const GAME_STATES={
    "MENU":0,
    "RUNNING":1,
    "GAMEOVER":2
}

const canvas= document.getElementById("canvas");

const context= canvas.getContext("2d");


const game= new Game(context,GAME_WIDTH,GAME_HEIGHT);

const controller = new Controller(game);

game.start();

function render(){
  game.render();
}

function update(){
  game.update();
}

const engine=new Engine(FRAME_RATE,update,render);

engine.start();
