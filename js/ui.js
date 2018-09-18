/* global Game */
const _canvas = document.createElement('canvas');
const _ctx = _canvas.getContext('2d');
const _FPS = 30; //frames per second


class GameArea {

  static get canvas () {
    return _canvas;
  }
  static get ctx () {
    return _ctx;
  }
  static get FPS () {
    return _FPS;
  }


  static start () {
    this.canvas.width = window.innerWidth - window.innerWidth * 0.01 ;//1280;
    this.canvas.height = window.innerHeight -window.innerHeight * 0.02;//820;
    this.context = this.ctx;
    this.frameNo = 0;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(Game.updateAll, 1000 / this.FPS);

    window.addEventListener('keydown', (e) => {
      this.keys = (this.keys || []);
      this.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = false;
    });
  }

  static stop () {
    clearInterval(this.interval);
  }

  static clear () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static finish () {
    this.stop();
    this.canvas.parentNode.removeChild(this.canvas);
  }
}
