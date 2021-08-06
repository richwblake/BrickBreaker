import Brick from './brick.js';

export default class BrickBuilder {
  constructor(context) {
    this.context = context;
    this.bricks = [];
    this.currentLevel = 1;
  }

  createBricksForCurrentLevel() {
    this.bricks = [];
    switch (this.currentLevel) {
      case 1:
        this.createBricksForLevelOne();
        break;
      case 2:
        this.createBricksForLevelTwo();
        break;
      case 3:
        this.createBricksForLevelThree();
        break;
    }
  }

  createBricksForLevelOne() {
    let yToDrawAt = 0;
    let xToDrawAt = 0;
    for(let i = 0; i < 48; i++) {
      if (i % 12 === 0 && i != 0) {
        yToDrawAt += 70;
      }
      if ((yToDrawAt / 70) % 2 === 0) {
        xToDrawAt = (i % 12) * 200;
      } else {
        xToDrawAt = ((i % 12) * 200) - 100;
      }
      if (xToDrawAt >= 0 && xToDrawAt < this.context.canvas.width) {
        this.bricks.push(new Brick(Math.abs(xToDrawAt), Math.abs(yToDrawAt), this.context));
      }
    }
  }

  createBricksForLevelTwo() {
    let yToDrawAt = 0;
    let xToDrawAt = 0;
    for(let i = 0; i < 48; i++) {
      if (i % 12 === 0 && i != 0) {
        yToDrawAt += 70;
        xToDrawAt = 0;  
      }
      xToDrawAt = (i % 12) * 100;
      this.bricks.push(new Brick(xToDrawAt, yToDrawAt, this.context));
    }
  }

  createBricksForLevelThree() {
    let yToDrawAt = 0;
    let xToDrawAt = 0;
    for(let i = 0; i < 60; i++) {
      if (i % 12 === 0 && i != 0) {
        yToDrawAt += 70;
        xToDrawAt = 0;  
      }
      xToDrawAt = (i % 12) * 100;
      if ((yToDrawAt / 70) % 2 === 0) {
        this.bricks.push(new Brick(xToDrawAt, yToDrawAt, this.context));
      }
    }
  }

  draw() {
    this.bricks.forEach(brick => {
      if (!brick.isHit) {
        brick.draw();
      }
    });
  }
}