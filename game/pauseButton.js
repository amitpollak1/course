
export class PauseButton{
    constructor(game){
        this.game=game;
        this.y=5;
        this.width=50;
        this.x=360;
        this.height=60;
        this.image= new Image();
        this.image.src="assetsDJ/pause.png"
        
        window.addEventListener("click", () => {
            if (this.game.isPaused === false){
                this.game.isPaused = true;
                this.game.pause();
                console.log(this.game.isPaused);
                this.image.src="assetsDJ/1343174-200-removebg-preview (1).png"
                console.log(this.game.isPaused);
            }
            else if (this.game.isPaused === true){
                this.game.isPaused =false;
                this.image.src="assetsDJ/pause.png"
                console.log(this.game.isPaused);
            }


        });
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }



}