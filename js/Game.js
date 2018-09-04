const COLOR_WHITE = '#EDF2F4';
let spaceship,gamestat;

const components = new Map();

class Game{

  static startGame () {
    GameArea.start();
    Sound.creatSoundList();
    gamestat = new GameStats();
    spaceship = new Spaceship();
    createAsteroidBelt();
  }

  static updateGameArea () {
    GameArea.clear();


    // User Interaction
    (GameArea.keys && GameArea.keys[39]) ? spaceship.rotateRight():
      (GameArea.keys && GameArea.keys[37]) ? spaceship.rotateLeft() : spaceship.stopRotate();

    (GameArea.keys && GameArea.keys[38]) ? spaceship.thrust() : spaceship.stopThrust();
    (GameArea.keys && GameArea.keys[32]) ? spaceship.fire() : spaceship.allowFire();


    // Game Logic


    // Positional Logic
    spaceship.relocate();
    spaceship.newPos();
    components.forEach( (c) => {
      if (c instanceof Asteroid)
        c.relocate();
      // if ((c instanceof Shot) && (c.isOutOfGameArea())) // Fix
      //   components.delete(c.id);
      c.newPos();

    });


    //Colision Detection
    components.forEach( (cAsteroid) => {
      if (cAsteroid instanceof Asteroid){
        // check if astroid hit by shot
        components.forEach( (cShoot) => {
          if (cShoot instanceof Shot && cShoot.isHit(cAsteroid.x, cAsteroid.y, cAsteroid.radius)){
            // destroy the asteroid and activate the laser explosion
            cAsteroid.brewingUp();
            cShoot.explode();
          }
        });

        // check if astroid hit the spaceship
        if (spaceship.isCollision(cAsteroid.x, cAsteroid.y, cAsteroid.radius)){
          console.log('astroid hit the spaceship');
          cAsteroid.brewingUp();
          spaceship.explode();
        }

      }
    });



    // Render
    spaceship.updateDisplay();
    gamestat.updateDisplay();
    components.forEach( (c) => c.updateDisplay() );

  }





}





//////////////////////////////////////////


const gameOver = () => {
  console.log('game over');

  GameArea.finish();
};



function createAsteroidBelt() {
  let x, y,r;
  for (let i = 0; i < 10; i++) {
    // random asteroid location (not touching spaceship)
    do {

      x = Math.floor(Math.random() * GameArea.canvas.width);
      y = Math.floor(Math.random() * GameArea.canvas.height);
      r = Math.ceil(ROID_SIZE / 2);//r = Math.ceil(ROID_SIZE / 2);
    } while (distBetweenPoints(spaceship.x, spaceship.y, x, y) < ROID_SIZE * 2 + spaceship.radius);
    const a = new Asteroid(x, y, r);
    components.set(a.id, a);
  }
}
