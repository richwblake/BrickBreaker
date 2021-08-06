export default class InputHandler {
  constructor(paddle, game) {
    this.paddle = paddle;
    this.game = game;
    document.addEventListener('keydown', e => {
      if (e.key === "ArrowRight") {
        this.paddle.moveRight();
      } else if (e.key === "ArrowLeft") {
        this.paddle.moveLeft();
      } else if (e.key === "Escape") {
        this.game.togglePause();
      }
    })

    document.addEventListener('keyup', e => {
      if (e.key === "ArrowRight") {
        if (this.paddle.speed > 0) {
          this.paddle.stop();
        }
      } else if (e.key === "ArrowLeft") {
        if (this.paddle.speed < 0) {
          this.paddle.stop();
        }
      }
    })
  }
}