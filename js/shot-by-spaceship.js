const SHOT_SPACESHIP_COL = 'salmon';

class ShotBySpaceship extends Shot {

  constructor () {
    super(1, 1, SHOT_SPACESHIP_COL, spaceship.x +4, spaceship.y, spaceship.velocity + SHOT_VEL,90/180 * Math.PI -spaceship.angle);
    soundList.get('fire').play();
  }
}
