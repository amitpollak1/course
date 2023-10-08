export class Enemy {
    constructor(game){

        this.image=new Image();
        this.image.src="assetsDJ/enemy.png"
        this.game=game;
        this.width=60;
        this.height=60;
        this.x =(Math.floor(Math.random() * (this.game.width-this.width)-0+1) + 0);
        this.y =  (Math.floor(Math.random() * (-300)) + (-60));
        this.vx=2;

    }

    update(){
        if (this.x<0 || this.x>this.game.width-this.width) this.vx*=-1
        this.x+=this.vx;

    }

    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);

    }
}