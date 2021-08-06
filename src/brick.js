export default class Brick {
  constructor(x, y, context) {
    this.context = context;
    this.width = 100;
    this.height = 70;
    this.isHit = false;
    this.position = {
      x: x,
      y: y
    }
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = '#32A956';
    this.context.rect(this.position.x, this.position.y, this.width, this.height);
    this.context.fill();
    this.context.stroke();
  }
}