
export class Bullet{
    constructor(player){
        this.player =player;
        this.sizeModifier =0.1;
        this.width=160*this.sizeModifier;
        this.height=512*this.sizeModifier;
        this.x =this.player.x+ (this.player.width/2)-(this.width/2);
        this.y=this.player.y+(this.player.height/2)-(this.height/2);
        this.vy =-15;
        


    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update(){
        this.draw();
        this.position.x +=this.velocity.x;
        this.position.y +=this.velocity.y;
    }
}
