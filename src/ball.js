export default class Ball {
  constructor(context, brickBuilder, game) {
    this.context = context;
    this.game = game;
    this.brickBuilder = brickBuilder;
    this.radius = 8;
    this.maxSpeed = 4;
    this.position = {
      x: context.canvas.width / 2,
      y: context.canvas.height / 2
    }

    this.speed = {
      vspeed: -this.maxSpeed,
      hspeed: this.maxSpeed
    }

    this.bottom = this.position.y + this.radius;
    this.right = this.position.x + this.radius;
    this.left = this.position.x - this.radius;
    this.top = this.position.y - this.radius;
  }

  draw() {
    this.context.fillStyle = '#ffffff'
    this.context.beginPath();
    this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    this.context.fill();
  }

  bounceOffPaddle() {
    this.increaseSpeed();
    this.speed.vspeed = -this.speed.vspeed
  }

  increaseSpeed() {
    this.speed.hspeed *= 1.05;
    this.speed.vspeed *= 1.05;
  }

  update(dt) {
    if (dt) {
      this.position.x += this.speed.hspeed;
      this.position.y += this.speed.vspeed;

      this.bottom = this.position.y + this.radius;
      this.right = this.position.x + this.radius;
      this.left = this.position.x - this.radius;
      this.top = this.position.y - this.radius;
    }
  }

  checkForBallAndBrickCollision(brick) {
      if (!brick.isHit && this.position.x > brick.position.x && 
          this.position.x < brick.position.x + brick.width &&
          this.position.y > brick.position.y && 
          this.position.y < brick.position.y + brick.height) {
            return true;
          }
      return false;
  }

  adjustVectorOnCollision(brick) {
    const leftOfBrick = brick.position.x;
    const rightOfBrick = brick.position.x + brick.width;
    const topOfBrick = brick.position.y;
    const bottomOfBrick = brick.position.y + brick.height;

    if (Math.abs(this.position.x - leftOfBrick) < Math.abs(this.position.x - rightOfBrick) &&
               Math.abs(this.position.x - leftOfBrick) < Math.abs(this.position.y - topOfBrick) && 
               Math.abs(this.position.x - leftOfBrick) < Math.abs(this.position.y - bottomOfBrick)) {
          this.speed.hspeed = -this.speed.hspeed;
    } else if (Math.abs(this.position.x - rightOfBrick) < Math.abs(this.position.x - leftOfBrick) &&
               Math.abs(this.position.x - rightOfBrick) < Math.abs(this.position.y - topOfBrick) && 
               Math.abs(this.position.x - rightOfBrick) < Math.abs(this.position.y - bottomOfBrick)) {
          this.speed.hspeed = -this.speed.hspeed;
    } else if (Math.abs(this.position.y - topOfBrick) < Math.abs(this.position.y - bottomOfBrick) &&
               Math.abs(this.position.y - topOfBrick) < Math.abs(this.position.x - rightOfBrick) && 
               Math.abs(this.position.y - topOfBrick) < Math.abs(this.position.x - leftOfBrick)) {
          this.speed.vspeed = -this.speed.vspeed;
    } else if (Math.abs(this.position.y - bottomOfBrick) < Math.abs(this.position.y - topOfBrick) &&
               Math.abs(this.position.y - bottomOfBrick) < Math.abs(this.position.x - rightOfBrick) && 
               Math.abs(this.position.y - bottomOfBrick) < Math.abs(this.position.x - leftOfBrick)) {
          this.speed.vspeed = -this.speed.vspeed;
    } 
  }

  collision() {
    // check for horizontal collision with wall
    if (this.position.x + this.radius > this.context.canvas.width || this.position.x - this.radius < 0) {
      this.speed.hspeed = -this.speed.hspeed
    }

    // check for top-only vertical collision with ceiling
    if (this.position.y - this.radius < 0) {
      this.speed.vspeed = -this.speed.vspeed
    }

    // check for collision with bricks, and change ball vector based on area of impact 
    this.brickBuilder.bricks.forEach(brick => {
      if (this.checkForBallAndBrickCollision(brick)) {
        brick.isHit = true;
        this.game.score += 100;
        this.adjustVectorOnCollision(brick);
      }
    })


  }
}