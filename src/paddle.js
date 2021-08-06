export default class Paddle {
  constructor(context) {
    this.width = 150;
    this.height = 20;
    this.speed = 0;
    this.maxSpeed = 8;
    this.context = context;
    this.position = {
      x: this.context.canvas.width / 2 - this.width / 2,
      y: this.context.canvas.height - this.height - 10
    }
  }

  draw() {
    this.context.fillStyle = '#32A956';
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  update(dt) {
    if (dt) {
      this.position.x += this.speed;
    }

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.context.canvas.width) {
      this.position.x = this.context.canvas.width - this.width;
    }
  }

  bounceBallIfValidHit(ball) {
    if (Math.abs(ball.bottom - this.position.y) < Math.abs(ball.bottom - this.position.x + this.width) &&
        Math.abs(ball.bottom - this.position.y) < Math.abs(ball.bottom - this.position.x)) {
          ball.bounceOffPaddle();
    } else {
      ball.speed.hspeed = -ball.speed.hspeed;
    }
  }

  checkForCollisionWithBall(ball) {
    if (ball.bottom > this.position.y &&
        ball.right > this.position.x &&
        ball.left < this.position.x + this.width) {
          this.bounceBallIfValidHit(ball);
        }
  }

  collision(ball) {
    this.checkForCollisionWithBall(ball);
  }
}