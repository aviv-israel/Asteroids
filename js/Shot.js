/* global Component,GameArea  */
const SHOT_DIST = 0.6, // max distance laser can travel as fraction of screen width
  SHOT_EXPLODE_DUR = 0.001, // duration of the lasers' explosion in seconds
  SHOT_VEL = 20; // velocity of lasers in pixels per second

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
    this.x += this.velocity * Math.sin(this.angle);
    this.y -= this.velocity * Math.cos(this.angle);
    //console.log(`newpos ${this.id} ${this.x} ${this.y} ${this.angle}`);
  }

  //this function handle the drawing of the component.
  updateDisplay () {
    GameArea.ctx.fillStyle = this.color;
    GameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class ShotBySpaceship extends Shot {


    constructor () {
        // ship.lasers.push({ // from the nose of the ship
        //     x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        //     y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
        //     xv: LASER_SPD * Math.cos(ship.a) / FPS,
        //     yv: -LASER_SPD * Math.sin(ship.a) / FPS,
        //     dist: 0,
        //     explodeTime: 0
        // });


    super(10, 10, 'red', spaceship.x +4, spaceship.y, spaceship.velocity + SHOT_VEL,90/180 * Math.PI -spaceship.angle);
    soundList.get('fire').play();
  }

  explode () {
    this.explodeTime = Math.ceil(SHOT_EXPLODE_DUR * GameArea.FPS);
  }

  draw () {
    GameArea.ctx.fillStyle = 'salmon';
    GameArea.ctx.beginPath();
    GameArea.ctx.arc(this.x, this.y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
    GameArea.ctx.fill();
  }

  drawEplosion () {
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
      this.drawEplosion();
  }



  //
  // //            // move the lasers
  //           for (var i = ship.lasers.length - 1; i >= 0; i--) {
  //
  //               // check distance travelled
  //               if (ship.lasers[i].dist > LASER_DIST * canv.width) {
  //                   ship.lasers.splice(i, 1);
  //                   continue;
  //               }
  //
  //               // handle the explosion
  //               if (ship.lasers[i].explodeTime > 0) {
  //                   ship.lasers[i].explodeTime--;
  //
  //                   // destroy the laser after the duration is up
  //                   if (ship.lasers[i].explodeTime == 0) {
  //                       ship.lasers.splice(i, 1);
  //                       continue;
  //                   }
  //               } else {
  //                   // move the laser
  //                   ship.lasers[i].x += ship.lasers[i].xv;
  //                   ship.lasers[i].y += ship.lasers[i].yv;
  //
  //                   // calculate the distance travelled
  //                   ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
  //               }
  //
  //               // handle edge of screen
  //               if (ship.lasers[i].x < 0) {
  //                   ship.lasers[i].x = canv.width;
  //               } else if (ship.lasers[i].x > canv.width) {
  //                   ship.lasers[i].x = 0;
  //               }
  //               if (ship.lasers[i].y < 0) {
  //                   ship.lasers[i].y = canv.height;
  //               } else if (ship.lasers[i].y > canv.height) {
  //                   ship.lasers[i].y = 0;
  //               }
  //           }

}
