const   SCR_SIZE = 100, // starting size of asteroids in pixels
  SCR_SPD = 100, // max starting speed of asteroids in pixels per second
  //SCR_BREWINGUP_DUR = 0,
  SCR_S_SIZE = 1,
  SCR_L_SIZE = 2,
  SCR_S_RADIUS = 16,
  SCR_L_RADIUS = 28,
  SCR_S_IMG = 'assets/images/icon-saucer-small.png',
  SCR_L_IMG = 'assets/images/icon-saucer.png',
  SCR_S_PNT = 1000, // Point for hiting in small asteroid
  SCR_L_PNT = 200, // Point for hiting in large asteroid
  SCR_DEF_COL = '#EDF2F4',// Astroid default color //'slategrey' // TODO: to think witch color better
  SCR_DEBUG_MODE = true;


const scrImgS = new Image();
scrImgS.src = SCR_S_IMG;
const scrImgL = new Image();
scrImgL.src = SCR_L_IMG;


class Saucer extends Attacker {

  constructor(x,y,size) {
    const radius = size === SCR_S_SIZE ? SCR_S_RADIUS : SCR_L_RADIUS;
    super(0,0,x,y,0,0,radius);
    this.s = size;
    this.xv = Math.random() * SCR_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.yv = Math.random() * SCR_SPD / GameArea.FPS * (Math.random() < 0.5 ? 1 : -1);
    this.color = SCR_DEF_COL;
    this.brewingupTime = 0;
  }

  brewingUp (){
    //this.brewingupTime = Math.ceil(SCR_BREWINGUP_DUR * GameArea.FPS);

    // destroy the saucer
    components.delete(this.id);
  }

  fire () {
    const s = new ShotBySaucer();
    components.set(s.id, s);
  }


  drawSaucer () {
    this.s === SCR_S_SIZE ?
      GameArea.ctx.drawImage(scrImgS, this.x-scrImgS.width/2, this.y-scrImgS.height/2):
      GameArea.ctx.drawImage(scrImgL, this.x-scrImgL.width/2, this.y-scrImgL.height/2)
  }

  updateDisplay () {
    this.drawSaucer();

    if (SCR_DEBUG_MODE)
      this.drawDebug();
  }

}
