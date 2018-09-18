/* global Component,GameArea  */
const SHOT_DIST = 0.4, // max distance laser can travel as fraction of screen width
  SHOT_EXPLODE_DUR = 0.01, // duration of the lasers' explosion in seconds
  SHOT_VEL = 20, // velocity of shot in pixels per second
  SHOT_SIZE = 2;

class Shot extends Component {

  constructor (width, height, color, x, y, velocity, angle) {
    super(width, height, x, y, velocity, angle);
    this.color = color;
    this.dist =  0;
    this.explodeTime = 0
  }

  isHit (targetX, targetY, targetR) {
    return (this.explodeTime === 0) &&
    (distBetweenPoints(targetX, targetY, this.x, this.y) < targetR);
  }

  // Calculate new position
  newPos () {
    // check distance travelled
    if (this.dist > SHOT_DIST * GameArea.canvas.width) {
      components.delete(this.id);
    }
    // handle the explosion
    else if (this.explodeTime > 0) {
      this.explodeTime--;

      // destroy the laser after the duration is up
      if (this.explodeTime === 0)
        components.delete(this.id);
    } else {
      // move the laser
      this.x += this.velocity * Math.sin(this.angle);
      this.y -= this.velocity * Math.cos(this.angle);

      // calculate the distance travelled
      this.dist += Math.sqrt(Math.pow(this.velocity * Math.sin(this.angle), 2) + Math.pow(this.velocity * Math.cos(this.angle), 2));

      this.relocate();
    }


    //console.log(`newpos ${this.id} ${this.x} ${this.y} ${this.angle}`);
  }

  relocate () {
    // handle edge of screen
    if (this.x < 0)
      this.x = GameArea.canvas.width;
    else if (this.x > GameArea.canvas.width)
      this.x = 0;

    if (this.y < 0)
      this.y = GameArea.canvas.height;
    else if (this.y > GameArea.canvas.height)
      this.y = 0;

  }

  draw () {
    GameArea.ctx.fillStyle = this.color;
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, SHOT_SIZE, 0, Math.PI * 2, false);
    GameArea.ctx.fill();
  }


  explode () {
    this.explodeTime = Math.ceil(SHOT_EXPLODE_DUR * GameArea.FPS);
  }

  drawExplosion () {
    GameArea.ctx.fillStyle = 'orangered';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, spaceship.radius * 0.75, 0, Math.PI * 2, false);
    GameArea.ctx.fill();
    GameArea.ctx.fillStyle = 'salmon';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, spaceship.radius * 0.5, 0, Math.PI * 2, false);
    GameArea.ctx.fill();
    GameArea.ctx.fillStyle = 'pink';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, spaceship.radius * 0.25, 0, Math.PI * 2, false);
    GameArea.ctx.fill();
  }


  updateDisplay () {
    if (this.explodeTime === 0)
      this.draw();
    else
      this.drawExplosion();
  }

}
