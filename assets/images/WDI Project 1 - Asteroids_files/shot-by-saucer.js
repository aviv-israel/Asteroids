const SHOT_SAUCER_VEL = 20,
  SHOT_SAUCER_COL = 'white';

class ShotBySaucer extends Shot {

  constructor (saucerX,saucerY,angle) {
    super(0, 0, SHOT_SAUCER_COL, saucerX, saucerY, SHOT_SAUCER_VEL, angle);
  }


}
