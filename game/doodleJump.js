import { Cloud } from "./cloud.js";
import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { Enemy } from "./assetsDJ/enemy.js";
import { PauseButton } from "./pauseButton.js";
import { Bullet } from "./assetsDJ/bullet.js";
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = "assetsDJ/background.png";
  let score = 0;
  canvas.width = 420;
  canvas.height = 600;
  canvas.style.marginTop = window.innerHeight / 2 - canvas.height / 2 + "px";
  const gameOverColor = "black";
  const moveCloudsMin=15;
  const moveCloudMax=40;
  const addEnemyScore =10;
  const minCloudsLength=9;
  const gameOverFont = "16px sans-serif";
  const newCloudsRange= -40;

  class Game {
    constructor(width, height) {
      this.isPaused = false;
      this.isGameOver = false;
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
      this.clouds = [];
      this.enemies = [];
      this.bullets = [];
      this.landedOn = null;
      this.pauseButton = new PauseButton(this);

      while (this.clouds.length < 10) {
        this.generateRandomCloud(canvas.height);
      }
    }
    sortCloudsArr() {
      this.clouds.sort((a, b) => {
        return a.y - b.y;
      });
    }

    update() {
      this.player.update(this.input.keys, ctx);
      this.enemies.forEach((enemy) => 
        enemy.update()
      );
    }

    draw(context) {
      this.player.draw(context);
      this.enemies.forEach((enemy) => 
        enemy.draw(context)
      );
      this.pauseButton.draw(context);
    }

    addEnemy() {
      this.enemies.push(new Enemy(this));
    }

    generateRandomCloud(height) {
      let y = Math.random() * height;
      y -= y % 20;
      let x = Math.random() * (canvas.width - 70);
      let collision = false;
      const c = new Cloud(x, y);
      this.clouds.forEach((c1) => {
        if (this.ifCollision(c, c1)) collision = true;
      });
      if (!collision) {
        this.clouds.push(c);
        this.sortCloudsArr();
      }
    }

    ifCollision(o1, o2) {
      return (
        o1.y + o1.height >= o2.y &&
        o1.y <= o2.y + o2.height &&
        o1.x + o1.width >= o2.x &&
        o1.x <= o2.x + o2.width
      );
    }

    removeFromCloudsArr() {
      this.clouds.forEach((c) => {
        if (c.y > this.height) this.clouds.splice(this.clouds.indexOf(c), 1);
      });
    }

    removeFromEnemiesArr() {
      if (this.enemies[0].y > this.height) this.enemies.pop();
    }

    col(c) {
      return (
        this.player.y + this.player.height >= c.y &&
        this.player.y <= c.y + c.height &&
        this.player.x + this.player.width >= c.x &&
        this.player.x <= c.x + c.width &&
        this.player.vel.y > 0
      );
    }

    gameOver() {
      this.isGameOver = true;
      this.player.vel.y = 0;
      ctx.fillStyle = gameOverColor;
      ctx.font = gameOverFont;
      ctx.fillText("GAME OVER", this.width / 2 - 50, this.height / 2);
      ctx.fillText("score=" + score, this.width / 2 - 25, this.height / 2 + 20);
      ctx.fillText(
        "click to try again",
        this.width / 2 - 60,
        this.height / 2 + 40
      );
    }

    moveRandomCloud() {
      let cloudI = Math.floor(Math.random() * (this.clouds.length - 1)) + 0;
      this.clouds[cloudI].movePlatform(this.width);
    }
    shoot() {
      this.bullets.push(new Bullet(this.player));
    }
    updateMovement(){
        this.clouds.forEach((c) => {
            c.y += 5;
          });
          this.player.y += 5;
          if (this.enemies.length > 0) {
            this.enemies[0].y += 5;
            this.removeFromEnemiesArr();
          }
    }
    handleEnemies(){
        if (this.enemies.length > 0) {
            if (this.ifCollision(this.player, this.enemies[0])) {
              this.isGameOver = true;
            }
          }
    }
    pause(){
        this.player.vel.y=0;
        console.log(this.player.vel.y)
    }
    styleGameOver(){
        ctx.fillStyle = gameOverColor;
        ctx.font = gameOverFont;
        ctx.fillText(score, 5, 20);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  const animate = () => {

    if (game.isGameOver) {
      game.gameOver();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    ctx.drawImage(image, 0, 0);
    game.draw(ctx);



    if (score >= moveCloudsMin && score < moveCloudMax) game.moveRandomCloud(game.width);
    
    while (game.enemies.length < 1 && score > addEnemyScore) {
      game.addEnemy();
    }

    game.clouds.forEach((c) => {
      c.draw(ctx);
      if (game.col(c)) {
        if (c.collide === false) {
          score++;
          c.collide = true;
        }
      }
      if (game.col(c) && c.y > game.height / 3) {
        game.landedOn = c;
        game.player.jump(c);

      }
    });

    if (game.landedOn != null && game.landedOn.y < canvas.height - 50) {
      game.updateMovement();
    }

    if (score > 0 && game.player.y + game.player.height >= game.height) {
      game.isGameOver = true;
    }

    game.handleEnemies();
    game.removeFromCloudsArr();
    while (game.clouds.length < minCloudsLength) {
      game.generateRandomCloud(newCloudsRange);
    }

    game.styleGameOver();

    const anim = requestAnimationFrame(animate);
  };

  window.addEventListener("click", () => {
    if (game.isGameOver) {
      location.reload();
    }
  });

  animate();
});
