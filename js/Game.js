
const COLOR_WHITE = '#EDF2F4',
  READY_FONT_SIZE = '80px',
  GAME_STP_OVER_FONT_SIZE =  '60px',
  GAME_FOOTER_FONT_SIZE =  '22px',
  GAME_STP_SAVE_FONT_SIZE =  '60px',
  GAME_STP_OVER_DUR =  4,
  GAME_STP_PRE = 1, // pre enter to game step
  GAME_STP_READY = 2, // ready to begin the game step
  GAME_STP_ON = 3, // the game on step
  GAME_STP_OVER = 4, // the game over step
  GAME_STP_SAVE = 5,  // keep the score and the name step
  GAME_STP_SSCORE = 6; // show score step

let spaceship,gamestat; // TODO: make this property  (static?) and change the name of gamestart to play

const components = new Map(); // // TODO: make this static property



class Game{ //// TODO: cancle static - real object

  constructor () {
    this._step = 1;
    this.gameOverDuration = Math.ceil(GAME_STP_OVER_DUR * GameArea.FPS);
  }


  static init () {
    GameArea.start();
    Sound.creatSoundList();
    gamestat = new GameStats();
    spaceship = new Spaceship();
    const s = new Saucer(200,200,1);
    components.set(s.id,s);
    const s2 = new Saucer(200,200,2);
    components.set(s2.id,s2);
    createAsteroidBelt();
  }

  static resetGame () {
    components.clear();
    gamestat = new GameStats();
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
    Game.resetGame();
    components.set(spaceship.id, spaceship);
    Asteroid.generateAsteroids();

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
      --this.gameOverDuration;
    } else {
      this.turnStepReady()
      //this.turnStepSave();
    }
  }

  static turnStepSave () {
    Game.step = GAME_STP_SAVE;
  }

  static drawSaveText () {
    GameArea.ctx.font = `${GAME_STP_SAVE_FONT_SIZE} ${FONT_NAME}`;
    GameArea.ctx.fillStyle = 'white';
    GameArea.ctx.textAlign = 'start';
    GameArea.ctx.fillText(
      'YOUR SCORE IS ONE OF THE TEN BEST',
      GameArea.canvas.width * 0.15,
      GameArea.canvas.height * 0.2);
    console.log('drawSaveText');

    GameArea.ctx.fillText(
      'PLEASE ENTER YOR NAME',
      GameArea.canvas.width * 0.15,
      GameArea.canvas.height * 0.3);
    console.log('drawSaveText');
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


  static cdShotOnAttacker(attacker) {
    if (attacker instanceof Attacker){
      //check if attacker hit by shot of spaceship
      components.forEach( (cShoot) => {
        if (cShoot instanceof ShotBySpaceship &&
           cShoot.isHit(attacker.x, attacker.y, attacker.radius)){
          attacker.brewingUp();
          cShoot.explode();
        }
      });
    }
  }

  // check colison between spaceship and attackers
  static cdSpaceshipAttacker(attacker) {
    if ((attacker instanceof Attacker) &&
      (spaceship.isCollision(attacker.x, attacker.y, attacker.radius))){
      attacker.brewingUp();
      spaceship.explode();
    }
  }


  static cdShotOnSpaceship(shotOfSaucer) {
    if ((shotOfSaucer instanceof ShotBySaucer) &&
      (spaceship.isCollision(shotOfSaucer.x, shotOfSaucer.y, 1))){
      shotOfSaucer.explode();
      spaceship.explode();
    }
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
        (GameArea.keys && GameArea.keys[32]) ||
        (GameArea.keys && GameArea.keys[13]) )
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
        gamestat.newPos();

        //Colision Detection //// FIXME: refactoring with colision function
        components.forEach( (c) => {
          Game.cdShotOnAttacker(c);
          Game.cdSpaceshipAttacker(c);
          Game.cdShotOnSpaceship(c);
        });

        // Render
        gamestat.updateDisplay();
        components.forEach( (c) => c.updateDisplay() );

        break;
      case GAME_STP_OVER:
        Game.drawGameOver();
        break;

      case GAME_STP_SAVE:
        Game.drawSaveText();
        gamestat.updateDisplay();
        //Game.addInput(GameArea.canvas.width * 0.5, GameArea.canvas.height * 0.7);


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
