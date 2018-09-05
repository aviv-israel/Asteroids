const   SCR_SIZE = 100, // starting size of asteroids in pixels
  SCR_SPD = 50, // max starting speed of asteroids in pixels per second
  SCR_VERT = 10, // average number of vertices on each asteroid
  SCR_S_SIZE = 1,
  SCR_L_SIZE = 2,
  SCR_S_RADIUS = 20,
  SCR_L_RADIUS = 50,
  SCR_S_IMG = ''
  SCR_L_IMG = ''
  SCR_S_PNT = 1000, // Point for hiting in small asteroid
  SCR_L_PNT = 200, // Point for hiting in large asteroid
  SCR_DEF_COL = '#EDF2F4',// Astroid default color //'slategrey' // TODO: to think witch color better
  SCR_DEBUG_MODE = false;

class Saucer extends Attacker {

  constructor(x,y,s) {
    super(width, height, x, y, velocity, angle);
    this.r =
    this.color = color;

  }

  brewingUp (){}

  fire () {
    
  }

  relocate () {
    // like asteroid
  }

  pos (){}//put on Attacker

  drawSaucer () {}

  updateDisplay () {}

}
