/* global Component,  */
class Spaceship extends Component {

  constructor(width, height, color, x, y) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.color = color;
  }

  //this function define the new position
  newPos () {
    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }

  speedUp() {
    console.log('moveup');
    this.speed += 1;
  }

  speedDown() {
    console.log('movedown');
    this.speedY -= 1;
  }

  rotateRight() {
    this.moveAngle += 1;

  }

  rotateLeft() {
    this.moveAngle -= 1;
  }

  stopMove() {
    this.speed = 0;
    this.moveAngle = 0;
  }

  //this function handle the drawing of the component.
  update () {
    //console.log('update');
    ctx = myGameArea.context;
    // ctx.beginPath();
    // ctx.moveTo(75, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
