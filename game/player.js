export class Player {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 79;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height;
        this.vel = { x: 0, y: 0 };
        this.image = this.speed = 0;
        this.maxSpeed = 10;
        this.gravity = 0.8;
        this.jumpForce = -20;
        this.imageRight = new Image();
        this.image= new Image();
        this.imageRight
        this.left=false;
        this.up=false;
        this.image.src ="assetsDJ\doodler-right_2_60x59.png"

    }

    update(input) {
        this.vel.y += this.gravity;
        this.y += this.vel.y;
        this.x += this.speed;

        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height;
            this.vel.y = this.jumpForce;
            if (this.vel.y >= this.maxSpeed) this.vel.y = this.maxSpeed;
            console.log(this.vel.y);
        }

        if (input.includes("ArrowRight")){
             this.speed = this.maxSpeed;
            this.left=false;
            this.up=false;}
        else if (input.includes("ArrowLeft")){
            console.log(input);
            this.speed = -this.maxSpeed;
            this.left=true;
        }
        else if (input.includes("ArrowUp")) {
            this.speed = -this.maxSpeed;
            this.up=true;
            this.left=false;}
        else this.speed = 0;
        if (this.x <= -this.width) this.x = this.game.width;
        else if (this.x > this.game.width) this.x = 0;
    }

    jump(c){
        this.y = c.y - this.height;
        this.vel.y = this.jumpForce;
    }

    draw(context) {
        const imageRight = new Image();
        if (this.left){
            console.log("hdskajhd")
            imageRight.src="assetsDJ/doodler-left (1).png";
        }
        else if(this.up){
            imageRight.src="assetsDJ/doodleUp.png";
            
        }
        else{
            imageRight.src = "assetsDJ/doodler-right_2_60x59.png";
        }
        context.drawImage(imageRight, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
