/* global Component, Attacker  */

class Attacker extends Component{
  constructor(width, height, x, y, velocity, angle,radius) {
    super(width, height, x, y, velocity, angle);
    this.radius = radius; //ROID_SIZE / 2;

  }

  drawDebug () {
    //center dot
    GameArea.ctx.fillStyle = 'red';
    GameArea.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);

    // show asteroid's collision circle
    GameArea.ctx.strokeStyle = 'lime';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    GameArea.ctx.stroke();
  }

  relocate () {
    // handle Attacker edge of screen
    if (this.x < 0 - this.radius) {
      this.x = GameArea.canvas.width + this.radius;
    } else if (this.x > GameArea.canvas.width + this.radius) {
      this.x = 0 - this.radius
    }
    if (this.y < 0 - this.radius) {
      this.y = GameArea.canvas.height + this.radius;
    } else if (this.y > GameArea.canvas.height + this.radius) {
      this.y = 0 - this.radius
    }
  }

  newPos () {
    this.x += this.xv;
    this.y += this.yv;
    this.relocate();
  }

}
