/* global Spaceship,Shot,Astroid  */
let spaceship;
let ctx;
const shots = [];
const attackers = [];
//const components = [];

//////////////////////////////////////////
document.addEventListener('DOMContentLoaded',() => {
  console.log('start game');
  startGame();
});
//////////////////////////////////////////

const startGame = () => {
  myGameArea.start();
  spaceship = new Spaceship(30, 30, 'white', myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
  attackers.push(new Astroid(40, 40, 'red', 160, 160, 1, 1));

};
//////////////////////////////////////////
const updateGameArea = () => {
  myGameArea.clear();
  spaceship.stopMove();


  // User Interaction
  if (myGameArea.keys && myGameArea.keys[37])  spaceship.rotateLeft();
  if (myGameArea.keys && myGameArea.keys[39])  spaceship.rotateRight();
  if (myGameArea.keys && myGameArea.keys[38])  spaceship.velocityInc()();
  if (myGameArea.keys && myGameArea.keys[40])  spaceship.velocityDec()();
  if (myGameArea.keys && myGameArea.keys[32])  shots.push(new Shot(10, 10, 'red', spaceship.x, spaceship.y, spaceship.velocity + 20, spaceship.angle));


  // Game Logic


  // Positional Logic
  spaceship.newPos();
  shots.forEach(comp => {
    comp.newPos();
  });
  attackers.forEach(comp => {
    comp.newPos();
  });
  // components.forEach(comp => {
  //   comp.newPos();
  // });

  //Colision Detection
  attackers.forEach(att => {
    shots.forEach(shot => {
      if (att.crashWith(shot)) {
        myGameArea.stop();
        console.log('Colision Detection');
        return;
      }
    });
  });


  // Render
  spaceship.update();
  // components.forEach(comp => {
  //   comp.update();
  // });
  shots.forEach(comp => {
    comp.update();
  });
  attackers.forEach(comp => {
    comp.update();
  });

};
/////////////////////////////////////////////////
const myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // Run the updateGameArea() function every 20th millisecond (50 times per second - the recomended time for action game)
    this.interval = setInterval(updateGameArea, 20);

    // Checks if a key is pressed, and set the key property of the myGameArea object to the key code. When the key is released, set the key property to false
    window.addEventListener('keydown', (e) => {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = (e.type === 'keydown');
    });

    window.addEventListener('keyup', (e) => {
      myGameArea.keys[e.keyCode] = (e.type === 'keydown');
    });

  },
  stop: function() {
    clearInterval(this.interval);
  },
  //clears the entire canvas.
  clear: function() {
    //console.log('clear');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
