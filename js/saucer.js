const SCR_SPD = 100, // max starting speed of saucer in pixels per second
  SCR_S_SIZE = 1,
  SCR_L_SIZE = 2,
  SCR_S_RADIUS = 16,
  SCR_L_RADIUS = 28,
  SCR_S_IMG = 'assets/images/icon-saucer-small.png',
  SCR_L_IMG = 'assets/images/icon-saucer.png',
  SCR_S_PNT = 1000, // Point for hiting in small asteroid
  SCR_L_PNT = 200, // Point for hiting in large asteroid
  SCR_DEF_COL = '#EDF2F4',// Astroid default color //'slategrey' // TODO: to think witch color better
  SCR_DEBUG_MODE = false,
  SCR_FIRE_TIME = 0.7,// Duration between fire - per second (1=every second)
  SCR_ALERT_SOUND_TIME = 0.6,// Duration between alert soubd - per second (1=every second)
  SCR_GENERATE_TIME = 3;//Duration between check if is it the random time to generate


const scrImgS = new Image();
scrImgS.src = SCR_S_IMG;
const scrImgL = new Image();
scrImgL.src = SCR_L_IMG;


class Saucer extends Attacker {

  constructor(x,y,size) {
    const radius = size === SCR_S_SIZE ? SCR_S_RADIUS : SCR_L_RADIUS;
    super(0,0,x,y,0,0,radius);// // TODO: refactor the contractor
    this.s = size;
    this.xv = Math.random() * SCR_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.yv = Math.random() * SCR_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.color = SCR_DEF_COL;
    this.brewingupTime = 0;
    this.fireTime = 0;
    this.sounAlertTime = 0;
  }

  brewingUp (){
    if (this.s === SCR_S_SIZE){
      gamestat.addPoint(SCR_S_PNT);
      console.log('gamestat.addPoint(SCR_S_PNT);');

    } else if (this.s === SCR_L_SIZE){
      gamestat.addPoint(SCR_L_PNT);
      console.log('gamestat.addPoint(SCR_L_PNT);');
    }

    // destroy the saucer
    components.delete(this.id);
  }

  fire () {
    const sauc = new ShotBySaucer(this.x, this.y, Math.random() * 6.2);
    components.set(sauc.id, sauc);
  }


  drawSaucer () {
    this.s === SCR_S_SIZE ?
      GameArea.ctx.drawImage(scrImgS, this.x-scrImgS.width/2, this.y-scrImgS.height/2):
      GameArea.ctx.drawImage(scrImgL, this.x-scrImgL.width/2, this.y-scrImgL.height/2)
  }

  isTimeFire () {
    if (this.fireTime === 0) {
      this.fireTime = SCR_FIRE_TIME * GameArea.FPS;
      // this.s ===  SCR_S_SIZE ? soundList.get('saucerSmall').play() : soundList.get('saucerBig').play();// // TODO: to put in another function
      return true;
    }
    --this.fireTime;
    return false;
  }


  isTimeAlertSound () {
    if (this.sounAlertTime === 0) {
      this.sounAlertTime = SCR_ALERT_SOUND_TIME * GameArea.FPS;
      return true;
    }
    --this.sounAlertTime;
    return false;
 }

  newPos () {
    super.newPos();
    if (this.isTimeFire()) {
      console.log('isfiretime');
      this.fire();
    }
    if (this.isTimeAlertSound())
      this.s ===  SCR_S_SIZE ? soundList.get('saucerSmall').play() : soundList.get('saucerBig').play();

  }


  updateDisplay () {
    this.drawSaucer();

    if (SCR_DEBUG_MODE)
      this.drawDebug();
  }

  static isTimeToGenerateSaucer() {
    if (Saucer.generateTime === 0) {
      Saucer.generateTime = SCR_GENERATE_TIME  * GameArea.FPS;
      return Math.random() < gamestat.level / 10 ? true  : false;
    }
    --Saucer.generateTime;
    return false;
  }

  static generateSaucer() {
    let x, y,s;
    // random Saucer location (not touching spaceship)
    do {
      x = Math.floor(Math.random() * GameArea.canvas.width);
      y = Math.floor(Math.random() * GameArea.canvas.height);
      s = Math.random() < gamestat.level ? SCR_S_SIZE : SCR_L_SIZE;
    } while (distBetweenPoints(spaceship.x, spaceship.y, x, y) < SCR_L_RADIUS * 2 + spaceship.radius);
    const ns = new Saucer(x, y, s);
    components.set(ns.id, ns);
  }

}
Saucer.generateTime = 0;
