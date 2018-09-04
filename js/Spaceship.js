/* global Component,GameArea,ShotBySpaceship,components  */
const SHIP_FRICTION = 0.3, // friction coefficient of space (0 = no friction, 1 = lots of friction)
  SHIP_ACCEL = 30,  // acceleration of the ship in pixels per second per second
  SHIP_ROT_SPEED = 180,  // turn speed in degrees per second
  SHIP_BLINK_DUR = 0.1, // duration in seconds of a single blink during ship's invisibility
  SHIP_EXPLODE_DUR = 0.3, // duration of the ship's explosion in seconds
  SHIP_INV_DUR = 1, // duration of the ship's invisibility in seconds
  SHIP_SIZE = 30, // ship height in pixels
  SHOT_MAX = 10, // maximum number of lasers on screen at once
  SHIP_DEF_COL = '#EDF2F4', //Ship def color
  SHIP_DEBUG_MODE = false; // Show bounds and logs


class Spaceship extends Component {

  constructor() {
    const angle = 90 / 180 * Math.PI;
    super(SHIP_SIZE, SHIP_SIZE, GameArea.canvas.width / 2, GameArea.canvas.height / 2, 0, angle);
    this.radius = SHIP_SIZE /2; // Radius
    this.moveAngle = 0; //rot
    this.color = SHIP_DEF_COL;
    this.isThrusting = false;
    this.thrust.x = 0;
    this.thrust.y = 0;
    this.isCanShot = true;
    this.blinkNum = Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR);
    this.blinkTime = Math.ceil(SHIP_BLINK_DUR * GameArea.FPS);
    this.explodeTime = 0;
    this.isLive = true;
  }

  //this function define the new position
  newPos () {
    if (this.isExploding()){
      // reduce the explode time
      this.explodeTime--;

      // reset the ship after the explosion has finished
      if (this.explodeTime === 0) {
        gamestat.decriseLive();
      }
    } else {
      this.angle += this.moveAngle;
      this.x += this.thrust.x;
      this.y += this.thrust.y;
    }

  }

  rotateRight () {
    this.moveAngle = -SHIP_ROT_SPEED / 180 * Math.PI / GameArea.FPS;
  }

  rotateLeft () {
    this.moveAngle = SHIP_ROT_SPEED / 180 * Math.PI / GameArea.FPS;
  }

  stopRotate () {
    this.moveAngle = 0;
  }

  thrust () {
    this.isThrusting = true;
    this.thrust.x += SHIP_ACCEL * Math.cos(this.angle) / GameArea.FPS;
    this.thrust.y -= SHIP_ACCEL * Math.sin(this.angle) / GameArea.FPS;
    soundList.get('thrust').play();
    //this.velocity = acceleration / GameArea.FPS;
  }

  stopThrust () {
    // apply FRICTION (slow the ship down when not thrusting)
    this.isThrusting = false;
    this.thrust.x -= SHIP_FRICTION * this.thrust.x / GameArea.FPS;
    this.thrust.y -= SHIP_FRICTION * this.thrust.y / GameArea.FPS;
    //this.velocity = acceleration / GameArea.FPS;
  }

  fire () {
    // create the laser object
    if (this.isCanShot && this.sumShotExist() < SHOT_MAX) {
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

  static draw (x = this.x, y = this.y, a = this.angle, r = this.radius, col = this.color) {
    GameArea.ctx.lineWidth = this.spaceshipSize / 20;
    GameArea.ctx.strokeStyle = col;
    GameArea.ctx.beginPath();
    GameArea.ctx.moveTo( // Nose of the ship
      x + 4 / 3 * r * Math.cos(a),
      y - 4 / 3 * r * Math.sin(a)
    );
    GameArea.ctx.lineTo( // Rear left
      x - r * (2 / 3 * Math.cos(a) + Math.sin(a)),
      y + r * (2 / 3 * Math.sin(a) - Math.cos(a))
    );
    GameArea.ctx.lineTo( // Rear right
      x - r * (2 / 3 * Math.cos(a) - Math.sin(a)),
      y + r * (2 / 3 * Math.sin(a) + Math.cos(a))
    );
    GameArea.ctx.closePath();
    GameArea.ctx.stroke();
  }

  isCollision (roidx, roidy, roidr) {
    return  (!this.isExploding() &&
      this.blinkNum === 0 &&
      this.isLive &&
      distBetweenPoints(this.x, this.y, roidx, roidy) < this.radius + roidr);
  }


  updateDisplaySpaceship () {
    Spaceship.draw(this.x, this.y, this.angle, this.radius, this.color);


    if (SHIP_DEBUG_MODE) {
      // show ship's collision circle
      GameArea.ctx.strokeStyle = 'lime';
      GameArea.ctx.beginPath();
      GameArea.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      GameArea.ctx.stroke();

      //centre dot (optional)
      GameArea.ctx.fillStyle = 'red';
      GameArea.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
    }

  }

  updateDisplayThruster () {
    GameArea.ctx.fillStyle = 'COLOR_WHITE';
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

  isBlinkOn () {
    return this.blinkNum % 2 === 0;
  }

  isExploding () {
    return (this.explodeTime > 0);
  }

  // This function handle the drawing of the component.
  updateDisplay() {
    this.relocate()

    // draw the spaceship
    if (!this.isExploding()) {
      console.log('isnot expoding')
      if (this.isBlinkOn() && this.isLive) {
        this.updateDisplaySpaceship()
      }

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
    } else {
      // draw the explosion (concentric circles of different colours)
      GameArea.ctx.fillStyle = 'darkred';
      GameArea.ctx.beginPath();
      GameArea.ctx.arc(this.x, this.y, this.radius * 1.7, 0, Math.PI * 2, false);
      GameArea.ctx.fill();
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
    if (this.isThrusting && !this.isExploding() && this.isBlinkOn) {
      this.updateDisplayThruster();
    }

  }


}
