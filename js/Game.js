
const COLOR_WHITE = '#EDF2F4',
  READY_FONT_SIZE = '80px',
  GAME_STP_OVER_FONT_SIZE =  '60px',
  GAME_FOOTER_FONT_SIZE =  '22px',
  GAME_STP_SAVE_FONT_SIZE =  '60px',
  GAME_STP_OVER_DUR =  0.2,
  GAME_STP_PRE = 1, // pre enter to game step
  GAME_STP_READY = 2, // ready to begin the game step
  GAME_STP_ON = 3, // the game on step
  GAME_STP_OVER = 4, // the game over step
  GAME_STP_SAVE = 5,  // keep the score and the name step
  GAME_STP_SSCORE = 6; // show score step

let spaceship,gamestat; // TODO: make this property  (static?) and change the name of gamestart to play

const components = new Map(); // // TODO: make this static property



class Game{ //// TODO: cancle static - real object

  // constructor () {
  //   // this._step = 1;
  //   // this.gameOverDuration = Math.ceil(GAME_STP_OVER_DUR * GameArea.FPS);
  //
  // }


  static init () {
    GameArea.start();
    Sound.creatSoundList();
    gamestat = new GameStats();
    spaceship = new Spaceship();
    createAsteroidBelt();
  }

  static isStepPre () {
    return GAME_STP_PRE === Game.step;
  }

  // display button and display to push from computer
  static turnStepReady () {
    Game.step = GAME_STP_READY;
  }

  static updateDisplayReady () { // TODO: change the name of function to drawReadyText
    if (Tool.isBlinkOn()) {
      GameArea.ctx.font = `${READY_FONT_SIZE} ${FONT_NAME}`;
      GameArea.ctx.fillStyle = 'white';
      GameArea.ctx.textAlign = 'center';
      GameArea.ctx.fillText('PUSH START',
        GameArea.canvas.width * 0.5,
        GameArea.canvas.height * 0.3);
    }
    Game.isBlinkOn = !Game.isBlinkOn;
  }




  // start the game
  static turnStepOn () {
    Game.step = GAME_STP_ON;
    components.set(spaceship.id, spaceship);
    //components.set(spaceship.id, spaceship);

  }


  static turnStepOver () {
    console.log('game over');
    Game.step = GAME_STP_OVER;

  }

  static drawGameOverText () {
    GameArea.ctx.font = `${GAME_STP_OVER_FONT_SIZE} ${FONT_NAME}`;
    GameArea.ctx.fillStyle = 'white';
    GameArea.ctx.textAlign = 'center';
    GameArea.ctx.fillText('GAME OVER',
      GameArea.canvas.width * 0.5,
      GameArea.canvas.height * 0.3);
  }
  static drawGameOver () {
    if (Game.gameOverDuration > 0) {
      Game.drawGameOverText();
      components.forEach( (c) => c.updateDisplay() );
      --gameOverDuration;
    } else {
      turnStepSave();
    }
  }

  static turnStepSave () {
    Game.step = GAME_STP_SAVE;
    GameArea.ctx.font = `${GAME_STP_SAVE_FONT_SIZE} ${FONT_NAME}`;
    GameArea.ctx.fillStyle = 'white';
    GameArea.ctx.textAlign = 'center';
    GameArea.ctx.fillText('YOUR SCORE BLE BJBJ HHHHJHNJNN   BJHJKN JHJKJNB  JBJHN  JGJ JH JHJNMBBBBBB',
      GameArea.canvas.width * 0.5,
      GameArea.canvas.height * 0.2);
  }

  static drawSaveText () {

  }

  static listOfScore () {

  }


  static drawFooterText () {
    GameArea.ctx.font = `${GAME_FOOTER_FONT_SIZE} ${FONT_NAME}`;
    GameArea.ctx.fillStyle = 'white';
    GameArea.ctx.textAlign = 'center';
    GameArea.ctx.fillText('1979 ATARI INC',
      GameArea.canvas.width * 0.5,
      GameArea.canvas.height * 0.93);
  }


  static updateAll () {
    GameArea.clear();
    Game.drawFooterText();
    switch (Game.step) {
      case GAME_STP_PRE:

        // Draw attackers (Asteroids & spacecraft)
        components.forEach( (c) => {
          c.newPos();
          c.updateDisplay()
        });
        break;

      case GAME_STP_READY:

        // User Interaction - If push the game start
        if ((GameArea.keys && GameArea.keys[39]) ||
        (GameArea.keys && GameArea.keys[37]) ||
        (GameArea.keys && GameArea.keys[38]) ||
        (GameArea.keys && GameArea.keys[32]) )
          Game.turnStepOn();

        // Draw the text
        Game.updateDisplayReady();

        // Draw attackers (Asteroids & spacecraft)
        components.forEach( (c) => {
          c.newPos();
          c.updateDisplay()
        });

        break;
      case GAME_STP_ON:
        // User Interaction
        (GameArea.keys && GameArea.keys[39]) ? spaceship.rotateRight():
          (GameArea.keys && GameArea.keys[37]) ? spaceship.rotateLeft() : spaceship.stopRotate();

        (GameArea.keys && GameArea.keys[38]) ? spaceship.thrust() : spaceship.stopThrust();
        (GameArea.keys && GameArea.keys[32]) ? spaceship.fire() : spaceship.allowFire();

        // Positional Logic
        components.forEach( (c) => c.newPos() );

        //Colision Detection //// FIXME: refactoring with colision function
        components.forEach( (cAsteroid) => {
          if (cAsteroid instanceof Asteroid){
            //check if astroid hit by shot
            components.forEach( (cShoot) => {
              if (cShoot instanceof Shot && cShoot.isHit(cAsteroid.x, cAsteroid.y, cAsteroid.radius)){
                // destroy the asteroid and activate the laser explosion
                cAsteroid.brewingUp();
                cShoot.explode();
              }
            });

            //check if astroid hit the spaceship
            if (spaceship.isCollision(cAsteroid.x, cAsteroid.y, cAsteroid.radius)){
              console.log('astroid hit the spaceship');
              cAsteroid.brewingUp();
              spaceship.explode();
            }
          }
        });

        // Render
        gamestat.updateDisplay();
        components.forEach( (c) => c.updateDisplay() );

        break;
      case GAME_STP_OVER:
        Game.drawGameOverText();
        components.forEach( (c) => c.updateDisplay() );
        //GameArea.stop();
        //setTimeout(console.log('hd'), 6000);
        console.log('testtttttt');
        break;

      case GAME_STP_SAVE:
        Gane.drawSaveText();

        break;
      default:


    }

  }

}
Game.step = 1;
Game.gameOverDuration = Math.ceil(GAME_STP_OVER_DUR * GameArea.FPS);


//////////////////////////////////////////





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
