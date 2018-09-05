
class ShotBySpaceship extends Shot {

  constructor () {
    super(1, 1, 'red', spaceship.x +4, spaceship.y, spaceship.velocity + SHOT_VEL,90/180 * Math.PI -spaceship.angle);
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

}
