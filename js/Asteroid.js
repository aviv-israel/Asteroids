/* global Component, Attacker  */
const ROID_JAG = 0.4, // jaggedness of the asteroids (0 = none, 1 = lots)
  ROID_NUM = 3, // starting number of asteroids
  ROID_SIZE = 100, // starting size of asteroids in pixels
  ROID_SPD = 50, // max starting speed of asteroids in pixels per second
  ROID_VERT = 10, // average number of vertices on each asteroid
  ROID_S_PNT = 100, // Point for hiting in small asteroid
  ROID_M_PNT = 50, // Point for hiting in medium asteroid
  ROID_L_PNT = 20, // Point for hiting in large asteroid
  ROID_DEF_COL = '#EDF2F4',// Astroid default color //'slategrey' // TODO: to think witch color better
  ROID_DEBUG_MODE = false;


class Asteroid extends Attacker {

  constructor (x, y, r) {
    let angle = Math.random() * Math.PI * 2;
    super(ROID_SIZE / 2,ROID_SIZE / 2,x,y,0,angle,r);
    this.offs = [];
    this.vert = Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2);
    this.xv = Math.random() * ROID_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.yv = Math.random() * ROID_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);

    // populate the offsets array
    for (var i = 0; i < this.vert; i++) {
      this.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
    }
  }

  brewingUp () {

    // split the asteroid in two if necessary
    if (this.radius === Math.ceil(ROID_SIZE / 2)) { // large asteroid
      soundList.get('bangLarge').play();
      gamestat.addPoint(ROID_L_PNT);
      const as1 = new Asteroid (this.x, this.y, Math.ceil(ROID_SIZE / 4));
      components.set(as1.id,as1);
      const as2 = new Asteroid (this.x, this.y, Math.ceil(ROID_SIZE / 4));
      components.set(as2.id,as2);

    } else if (this.radius === Math.ceil(ROID_SIZE / 4)) { // medium asteroid
      soundList.get('bangMedium').play();
      gamestat.addPoint(ROID_M_PNT);
      const as1 = new Asteroid (this.x, this.y, Math.ceil(ROID_SIZE / 8));
      components.set(as1.id,as1);
      const as2 = new Asteroid (this.x, this.y, Math.ceil(ROID_SIZE / 8));
      components.set(as2.id,as2);

    } else {
      soundList.get('bangSmall').play();
      gamestat.addPoint(ROID_S_PNT);
    }

    // destroy the asteroid
    components.delete(this.id);

  }


  drawAsteroid () {
    GameArea.ctx.strokeStyle = ROID_DEF_COL;
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
  }

  //this function handle the drawing of the component.
  updateDisplay () {
    this.drawAsteroid();

    if (ROID_DEBUG_MODE)
      this.drawDebug();
  }

}
