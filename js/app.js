/* global Spaceship,Shot,Attacker,Asteroid,GameArea  */
let spaceship;
let ctx; //// TODO: delete this

const components = new Map();


document.addEventListener('DOMContentLoaded',() => {
  console.log('start game');
  startGame();
  creatSoundList();
});


const startGame = () => {
  GameArea.start();
  spaceship = new Spaceship();
  // const a = new Asteroid(40, 40, 'blue', 160, 160, 1, 1);
  // components.set(a.id, a);
  // const a = new Asteroid(GameArea.canvas.width/2, GameArea.canvas.height/3);
  // console.dir(a);
  //   components.set(a.id, a);
  createAsteroidBelt();

};
//////////////////////////////////////////
const updateGameArea = () => {
  GameArea.clear();
  //spaceship.stopMove();


  // User Interaction
  (GameArea.keys && GameArea.keys[39]) ? spaceship.rotateRight():
    (GameArea.keys && GameArea.keys[37]) ? spaceship.rotateLeft() : spaceship.stopRotate();
  (GameArea.keys && GameArea.keys[38]) ? spaceship.thrust() : spaceship.stopThrust();
  //if (GameArea.keys && GameArea.keys[40])  spaceship.velocityDec();
  if (GameArea.keys && GameArea.keys[32]) spaceship.fire(); //// TODO:


  // Game Logic


  // Positional Logic
  spaceship.relocate();
  spaceship.newPos();
  components.forEach( (c) => {
    if (c instanceof Asteroid)
      c.relocate();
    if ((c instanceof Shot) && (c.isOutOfGameArea()))
      components.delete(c.id);
    c.newPos();

  });


  //Colision Detection
  components.forEach( (cAsteroid) => {
    if (cAsteroid instanceof Asteroid){
      components.forEach( (cShoot) => {
        if ((cShoot instanceof Shot) && (cAsteroid.crashWith(cShoot))) {
          //GameArea.stop();
          console.log('Colision Detection');
          cAsteroid.brewingUp();

        }
      });
    }
  });



  // Render
  spaceship.updateDisplay();
  components.forEach( (c) => c.updateDisplay() );

};

function createAsteroidBelt() {
  let x, y;
  for (let i = 0; i < 10; i++) {
    console.log('createAsteroidBelt');
    // random asteroid location (not touching spaceship)
    do {

      x = Math.floor(Math.random() * GameArea.canvas.width);
      y = Math.floor(Math.random() * GameArea.canvas.height);
    } while (distBetweenPoints(spaceship.x, spaceship.y, x, y) < ROID_SIZE * 2 + spaceship.radius);
    const a = new Asteroid(x, y);
    components.set(a.id, a);
  }
}

const distBetweenPoints = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
