/* global Component,  */
class Spaceship extends Component {

  constructor(width, height, color, x, y) {
    super(width, height, x, y, 0, 0);
    this.moveAngle = 0;
    this.color = color;
  }

  //this function define the new position
  newPos () {
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.velocity * Math.sin(this.angle);
    this.y -= this.velocity * Math.cos(this.angle);
  }

  // Increase Velocity
  velocityInc() {
    this.velocity += 1;
  }

  // Decrease Velocity
  velocityDec() {
    this.velocity -= 1;
  }

  rotateRight() {
    this.moveAngle += 1;

  }

  rotateLeft() {
    this.moveAngle -= 1;
  }

  stopMove() {
    this.velocity = 0;
    this.moveAngle = 0;
  }

  // This function handle the drawing of the component.
  update () {

    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }
}
