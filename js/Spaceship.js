/* global Component,GameArea,ShotBySpaceship,components  */
const friction = 0.7; // FIXME: // friction coefficient of space (0 = no friction, 1 = lots of friction)
const acceleration = 15; // FIXME: // acceleration of the ship in pixels per second per second
const rotateSpeed = 360; // FIXME: // turn speed in degrees per second
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const SHIP_TURN_SPD = 360; // turn speed in degrees per second
const SHOT_MAX = 10; // maximum number of lasers on screen at once

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
    this.isCanShot = true;
    this.blinkNum = Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR);
    this.explodeTime = 0;
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
    soundList.get('thrust').play();
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
    // create the laser object
    if (this.isCanShot && this.sumShotExist() < SHOT_MAX) {
      console.log('fire');
        const s = new ShotBySpaceship();
        components.set(s.id, s);
    }

      // prevent further shooting
      this.isCanShot = false;

  }

  allowFire () {
    this.isCanShot = true;
  }

  sumShotExist () {
    let sum = 0;
      components.forEach( (c) => {
        if (c instanceof ShotBySpaceship)
          ++sum;
      });
      return sum;
  }

  explode () {
    this.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * GameArea.FPS);
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

    // show ship's collision circle

    GameArea.ctx.strokeStyle = 'lime';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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


    let blinkOn = this.blinkNum % 2 === 0;
    let exploding = this.explodeTime > 0;

    // draw the spaceship
    if (!exploding) {
        if (blinkOn)
            this.updateDisplaySpaceship();
        // handle blinking
        if (this.blinkNum > 0) {

            // reduce the blink time
            this.blinkTime--;

            // reduce the blink num
            if (this.blinkTime === 0) {
                this.blinkTime = Math.ceil(SHIP_BLINK_DUR * GameArea.FPS);
                this.blinkNum--;
            }
        }

    }else {
        // draw the explosion (concentric circles of different colours)
        ctx.fillStyle = 'darkred';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius * 1.4, 0, Math.PI * 2, false);
        // ctx.fill();
        // ctx.fillStyle = "orange";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius * 1.1, 0, Math.PI * 2, false);
        // ctx.fill();
        // ctx.fillStyle = "yellow";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2, false);
        // ctx.fill();
        // ctx.fillStyle = "white";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2, false);
        // ctx.fill();
    }

    // draw the thruster
    if (this.isThrusting && !exploding && blinkOn) {
      this.updateDisplayThruster();
    }
    //centre dot (optional)
    GameArea.ctx.fillStyle = 'red';
    GameArea.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
  }


}
