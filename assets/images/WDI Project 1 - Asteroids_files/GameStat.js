const INIT_SPACESHIP_LIVES = 3,
  SCORE_EXSTRA_SPACESHIP = 10000,
  FONT_NAME = 'Hyperspace',
  FONT_SIZE = '50px',
  LIVE_SPACESHIP_SIZE = 8;


class GameStats {
  constructor() {
    this._score = 0;
    this._lives = INIT_SPACESHIP_LIVES;
    this._isAddedLive = false;
  }

  addPoint (points) {
    points > 0 ? this._score += points :
      new Error('fdf');//throw new Error('The number of points must be greater than 0');
  }

  decriseLive () {
    --this._lives;
    if (this._lives === 0) {
      Game.turnStepOver();
    } else {
      components.delete(spaceship.id);
      spaceship = new Spaceship();
      components.set(spaceship.id,spaceship);
    }
  }

  checkExtraLive () {
    if (!this._isAddedLive && this._score > SCORE_EXSTRA_SPACESHIP){
      ++this._lives;
      this._isAddedLive = true;
      soundList.get('extraShip').play();
    }
  }

  updateDisplayScore () {
    GameArea.ctx.font = `${FONT_SIZE} ${FONT_NAME}`;
    GameArea.ctx.fillStyle = 'white';
    //GameArea.ctx.textAlign = 'center';
    GameArea.ctx.fillText(this._score === 0 ? '00' : this._score,
      GameArea.canvas.width * 0.07,
      GameArea.canvas.height * 0.07);
  }

  upadateDisplayLive () {
    this.checkExtraLive();
    // draw the lives
    for (let i = 0; i < this._lives; i++) {
      Spaceship.draw(
        GameArea.canvas.width * 0.05 + i * LIVE_SPACESHIP_SIZE * 5,
        GameArea.canvas.width * 0.09,
        0.5 * Math.PI,//angle
        LIVE_SPACESHIP_SIZE *2,
        'white');
    }
  }

  updateDisplay () {
    this.updateDisplayScore();
    this.upadateDisplayLive();

  }

}
