/* global Component, Attacker  */
const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ROID_NUM = 3; // starting number of asteroids
const ROID_SIZE = 100; // starting size of asteroids in pixels
const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ROID_VERT = 10; // average number of vertices on each asteroid

class Asteroid extends Attacker {

  constructor (x, y) {
    let angle = Math.random() * Math.PI * 2;
    super(ROID_SIZE / 2,ROID_SIZE / 2,x,y,0,angle);
    this.offs = [];
    this.radius = ROID_SIZE / 2;
    this.vert = Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2);
    this.xv = Math.random() * ROID_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.yv = Math.random() * ROID_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);

    // populate the offsets array
    for (var i = 0; i < this.vert; i++) {
      this.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
    }
  }

  brewingUp () {
    if (this.mass > 20) {
      const as1 = new Asteroid (this.width , this.height / 2, this.color, this.x, this.y, this.velocity+4 , this.angle + Math.PI / 180);
      components.set(as1.id,as1);
      const as2 = new Asteroid (this.width , this.height / 2, this.color, this.x, this.y, this.velocity+3, this.angle - Math.PI / 180);
      components.set(as2.id,as2);
    }
    components.delete(this.id);

  }



  crashWith (otherobj) { //// FIXME: to add is before name function
    const myLeft  = this.x,
      myRight     = this.x + (this.width),
      myTop       = this.y,
      myBottom    = this.y + (this.height),
      otherLeft   = otherobj.x,
      otherRight  = otherobj.x + (otherobj.width),
      otherTop    = otherobj.y,
      otherBottom = otherobj.y + (otherobj.height);

    return !((myBottom < otherTop) ||
           (myTop > otherBottom) ||
           (myRight < otherLeft) ||
           (myLeft > otherRight));

  }

  relocate () {
    // handle asteroid edge of screen
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
  }
  //this function handle the drawing of the component.
  updateDisplay () {

    // draw the asteroids
    GameArea.ctx.strokeStyle = 'slategrey';
    GameArea.ctx.lineWidth = spaceship.radius / 10;

    // draw the path
    GameArea.ctx.beginPath();
    GameArea.ctx.moveTo(
      this.x + this.radius * this.offs[0] * Math.cos(this.angle),
      this.y + this.radius * this.offs[0] * Math.sin(this.angle)
    );

    // draw the polygon
    for (let j = 1; j < this.vert; j++) {
      GameArea.ctx.lineTo(
        this.x + this.radius * this.offs[j] * Math.cos(this.angle + j * Math.PI * 2 / this.vert),
        this.y + this.radius * this.offs[j] * Math.sin(this.angle + j * Math.PI * 2 / this.vert)
      );
    }
    GameArea.ctx.closePath();
    GameArea.ctx.stroke();

    //centre dot (optional)
    GameArea.ctx.fillStyle = 'red';
    GameArea.ctx.fillRect(this.x - 1, this.y - 1, 2, 2);

  }


}
