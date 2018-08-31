/* global Spaceship,Shot,Astroid  */
let spaceship;
let ctx;
const shots = [];
const attackers = [];

//////////////////////////////////////////
document.addEventListener('DOMContentLoaded',() => {
  console.log('start game');
  startGame();
});
//////////////////////////////////////////

const startGame = () => {
  myGameArea.start();
  spaceship = new Spaceship(30, 30, 'white', myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
  shots.push(new Astroid(40, 40, 'red', 160, 160, 0, 1));

};
//////////////////////////////////////////
const updateGameArea = () => {
  myGameArea.clear();
  spaceship.stopMove();

  if (myGameArea.keys && myGameArea.keys[37])  spaceship.rotateLeft();
  if (myGameArea.keys && myGameArea.keys[39])  spaceship.rotateRight();
  if (myGameArea.keys && myGameArea.keys[38])  spaceship.speedUp();
  if (myGameArea.keys && myGameArea.keys[40])  spaceship.speedDown();
  if (myGameArea.keys && myGameArea.keys[32])  shots.push(new Shot(10, 10, 'red', spaceship.x, spaceship.y, spaceship.speed+20, spaceship.angle));



  spaceship.newPos();
  spaceship.update();

  shots.forEach(shot => {
    shot.newPos();
    shot.update();
  });
};
/////////////////////////////////////////////////
const myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 960; //480;
    this.canvas.height = 540; // 270;
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
