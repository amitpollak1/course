export class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 20;
        this.collide = false;
        this.type;
        this.vx=4;

    }


    movePlatform(width){
        if (this.x<0 || this.x>width-this.width) this.vx*=-1
        this.x+=this.vx;

    }

    draw(context) {
        const image1 = new Image();
        image1.src = "assetsDJ/platform.png";
        context.drawImage(image1, this.x, this.y, this.width, this.height);
    }

    generateRandomCloud() {
        this.x = Math.random() * canvas.height;
        this.y = Math.random() * canvas.width;
    }
}
