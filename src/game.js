import InputHandler from './input.js';
import Paddle from './paddle.js'
import Ball from './ball.js';
import BrickBuilder from './brick_builder.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  WON: 4,
  CREDITS: 5
}

export default class Game {
  constructor(context) {
    this.context = context;
    this.brickBuilder = new BrickBuilder(context);
    this.brickBuilder.createBricksForCurrentLevel();
    this.ball = new Ball(context, this.brickBuilder, this);
    this.score = 0;
    this.paddle = new Paddle(context);
    this.inputHandler = new InputHandler(this.paddle, this);
    this.lastTime = 0;
    this.gameState = GAMESTATE.MENU;
    this.handleClick();
  }

  handleClick() {
    document.addEventListener('click', () => {
      if (this.gameState === GAMESTATE.MENU) {
        this.playGame();
      } else if (this.gameState === GAMESTATE.GAMEOVER) {
        this.reset();
      } else if (this.gameState === GAMESTATE.WON) {
        this.advanceLevel();
      } else if (this.gameState === GAMESTATE.CREDITS) {
        this.reset();
      }
    })
  }

  gameLoop = (timeStamp) => {
    let dt = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
  
    this.draw(dt);
  
    requestAnimationFrame(this.gameLoop);
  }

  draw(dt) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

    if (this.gameState === GAMESTATE.PAUSED) {
      this.showPauseScreen();
    }

    if (this.gameState === GAMESTATE.RUNNING) {
      this.paddle.collision(this.ball);
      this.paddle.update(dt);
      this.paddle.draw(this.context);
    
      this.ball.collision();
      this.ball.update(dt);
      this.ball.draw();
      this.showScore();
      this.showLevel();
      this.brickBuilder.draw();
    }

    if (this.gameState === GAMESTATE.MENU) {
      this.showMenu();
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.showGameOverScreen();
    }

    if (this.gameState === GAMESTATE.WON) {
      this.showWinScreen();
    }

    if (this.gameState === GAMESTATE.CREDITS) {
      this.showCredits();
    }

    this.checkForGameOver();
    this.checkForGameComplete();
    this.checkForWin();
  }

  openMenu() {
    if (this.lastTime === 0) {
      this.gameState = GAMESTATE.MENU;
      this.gameLoop(this.lastTime);
    }
  }

  playGame() {
    this.gameState = GAMESTATE.RUNNING;
  }

  checkForGameOver() {
    if (this.ball.bottom > this.context.canvas.height) {
      this.gameState = GAMESTATE.GAMEOVER;
    }
  }

  checkForWin() {
    if (!this.brickBuilder.bricks.find(brick => !brick.isHit) && this.gameState != GAMESTATE.CREDITS) {
      this.gameState = GAMESTATE.WON;
    }
  }

  checkForGameComplete() {
    if (!this.brickBuilder.bricks.find(brick => !brick.isHit) && this.brickBuilder.currentLevel === 3) {
      this.gameState = GAMESTATE.CREDITS;
    }
  }

  showGameOverScreen() {
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "rgba(0,0,0,0.5)";
    this.context.fill();

    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Nice try, click to try again", this.context.canvas.width / 2, this.context.canvas.height / 2);
  }

  showPauseScreen() {
    this.paddle.draw();
    this.ball.draw();
    this.brickBuilder.draw();

    this.context.fillStyle = "rgba(0,0,0,0.5)";
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fill();

    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Paused", this.context.canvas.width / 2, this.context.canvas.height / 2);
  }

  showScore() {
    let score = document.getElementById('score');
    score.innerText = `Score: ${this.score}`;
  }

  showLevel() {
    let level = document.getElementById('level');
    level.innerText = `Level ${this.brickBuilder.currentLevel}`;
  }

  showMenu() {
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "rgba(0,0,0,0.5)";
    this.context.fill();

    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Click to begin!", this.context.canvas.width / 2, this.context.canvas.height / 2);
    this.context.fillText("Press ESC to pause at any time", this.context.canvas.width / 2, (this.context.canvas.height / 2) + 50);
  }

  showWinScreen() {
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "rgba(0,0,0,0.5)";
    this.context.fill();

    this.context.font = "30px Arial";
    this.context.fillStyle = "white"
    this.context.textAlign = "center";
    this.context.fillText("You beat this level! You can do anything :)", this.context.canvas.width / 2, this.context.canvas.height / 2);
    this.context.fillText("Click to continue on to the next level", this.context.canvas.width / 2, (this.context.canvas.height / 2) + 50);
  }

  showCredits() {
    this.context.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.fillStyle = "rgba(0,0,0,0.5)";
    this.context.fill();

    this.context.font = "30px Arial";
    this.context.fillStyle = "white"
    this.context.textAlign = "center";
    this.context.fillText("You beat the game! At this point I'm just impressed.", this.context.canvas.width / 2, this.context.canvas.height / 2);
    this.context.fillText("Click to play again", this.context.canvas.width / 2, (this.context.canvas.height / 2) + 50);
  }

  advanceLevel() {
    this.brickBuilder.currentLevel += 1;
    if (this.brickBuilder.currentLevel <= 3) {
      this.brickBuilder.createBricksForCurrentLevel();
      this.ball = new Ball(this.context, this.brickBuilder, this);
      this.playGame();
    } else {
      this.gameState = GAMESTATE.CREDITS;
    }
  }

  reset() {
    this.brickBuilder.currentLevel = 1;
    this.brickBuilder.createBricksForCurrentLevel();
    this.ball = new Ball(this.context, this.brickBuilder, this);
    this.paddle = new Paddle(this.context);
    this.inputHandler.paddle = this.paddle;
    this.score = 0;
    this.playGame();
  }

  togglePause() {
    if (this.gameState === GAMESTATE.RUNNING) {
      this.gameState = GAMESTATE.PAUSED;
    } else if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    }
  }
}