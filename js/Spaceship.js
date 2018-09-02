/* global Component,GameArea,ShotBySpaceship,components  */
const friction = 0.7; // FIXME: // friction coefficient of space (0 = no friction, 1 = lots of friction)
const acceleration = 5; // FIXME: // acceleration of the ship in pixels per second per second
const rotateSpeed = 360; // FIXME: // turn speed in degrees per second


class Spaceship extends Component {

  constructor() {
    const Size = 30;
    const angle = 90 / 180 * Math.PI;
    super(Size, Size, GameArea.canvas.width / 2, GameArea.canvas.height / 2, 0, angle);
    this.radius = Size /2; // Radius
    this.moveAngle = 0; //rot
    this.color = '#fff';
    this.isThrusting = false;
    this.thrust.x = 0;
    this.thrust.y = 0;
  }

  //this function define the new position
  newPos () {
    this.angle += this.moveAngle;
    console.log('this.angle' + this.angle);
    this.x += this.thrust.x;
    this.y += this.thrust.y;
  }

  rotateRight () {
    this.moveAngle = -rotateSpeed / 180 * Math.PI / GameArea.FPS;
    console.log('rotate right' + this.moveAngle);
  }

  rotateLeft () {
    this.moveAngle = rotateSpeed / 180 * Math.PI / GameArea.FPS;
    console.log('rotate left' + this.moveAngle);
  }

  stopRotate () {
    this.moveAngle = 0;
  }

  thrust () {
    this.isThrusting = true;
    this.thrust.x += acceleration * Math.cos(this.angle) / GameArea.FPS;
    this.thrust.y -= acceleration * Math.sin(this.angle) / GameArea.FPS;
    //this.velocity = acceleration / GameArea.FPS;
  }
  stopThrust () {
    // apply friction (slow the ship down when not thrusting)
    this.isThrusting = false;
    this.thrust.x -= friction * this.thrust.x / GameArea.FPS;
    this.thrust.y -= friction * this.thrust.y / GameArea.FPS;
    //this.velocity = acceleration / GameArea.FPS;
  }

  fire () {
    const s = new ShotBySpaceship();
    components.set(s.id, s);
  }

  relocate (){
    // handle edge of screen
    if (this.x < 0 - this.radius)
      this.x = GameArea.canvas.width + this.radius;
    else if (this.x > GameArea.canvas.width + this.radius)
      this.x = 0 - this.radius;

    if (this.y < 0 - this.radius)
      this.y = GameArea.canvas.height + this.radius;
    else if (this.y > GameArea.canvas.height + this.radius)
      this.y = 0 - this.radius;

  }

  updateDisplaySpaceship () {
    GameArea.ctx.lineWidth = this.spaceshipSize / 20;
    GameArea.ctx.strokeStyle = this.color;
    GameArea.ctx.beginPath();
    GameArea.ctx.moveTo( // Nose of the ship
      this.x + 4 / 3 * this.radius * Math.cos(this.angle),
      this.y - 4 / 3 * this.radius * Math.sin(this.angle)
    );
    GameArea.ctx.lineTo( // Rear left
      this.x - this.radius * (2 / 3 * Math.cos(this.angle) + Math.sin(this.angle)),
      this.y + this.radius * (2 / 3 * Math.sin(this.angle) - Math.cos(this.angle))
    );
    GameArea.ctx.lineTo( // Rear right
      this.x - this.radius * (2 / 3 * Math.cos(this.angle) - Math.sin(this.angle)),
      this.y + this.radius * (2 / 3 * Math.sin(this.angle) + Math.cos(this.angle))
    );
    GameArea.ctx.closePath();
    GameArea.ctx.stroke();
  }

  updateDisplayThruster () {
    GameArea.ctx.fillStyle = 'white';
    GameArea.ctx.strokeStyle = 'yellow';
    GameArea.ctx.lineWidth = this.radius / 5;
    GameArea.ctx.beginPath();
    GameArea.ctx.moveTo( // rear left
      this.x - this.radius * (2 / 3 * Math.cos(this.angle) + 0.5 * Math.sin(this.angle)),
      this.y + this.radius * (2 / 3 * Math.sin(this.angle) - 0.5 * Math.cos(this.angle))
    );
    GameArea.ctx.lineTo( // rear centre (behind the this)
      this.x - this.radius * 5 / 3 * Math.cos(this.angle),
      this.y + this.radius * 5 / 3 * Math.sin(this.angle)
    );
    GameArea.ctx.lineTo( // rear right
      this.x - this.radius * (2 / 3 * Math.cos(this.angle) - 0.5 * Math.sin(this.angle)),
      this.y + this.radius * (2 / 3 * Math.sin(this.angle) + 0.5 * Math.cos(this.angle))
    );
    GameArea.ctx.closePath();
    GameArea.ctx.fill();
    GameArea.ctx.stroke();
  }

  // This function handle the drawing of the component.
  updateDisplay() {

    // draw the spaceship
    this.updateDisplaySpaceship();

    // draw the thruster
    if (this.isThrusting) {
      this.updateDisplayThruster();
    }
    //centre dot (optional)
    GameArea.ctx.fillStyle = 'red';
    GameArea.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
  }


}
