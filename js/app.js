let myGamePiece,myGamePiece2,shot1, shot2;
let ctx;

//////////////////////////////////////////
document.addEventListener('DOMContentLoaded',() => {
  console.log('start game');
  startGame();
});
//////////////////////////////////////////

const startGame = () => {
  myGameArea.start();
  myGamePiece = new Spaceship(30, 30, 'white', 10, 120);
  //myGamePiece2 = new Spaceship(30, 30, 'blue', 10, 120);
  shot1 = new Shots(0, 0, 'blue', 0, 0);
};

const updateGameArea = () => {
  myGameArea.clear();
  myGamePiece.stopMove();
  myGamePiece.stopRotate();
  if (myGameArea.key && myGameArea.key === 37)  myGamePiece.moveleft();
  if (myGameArea.key && myGameArea.key === 39)  myGamePiece.moveright();
  if (myGameArea.key && myGameArea.key === 38)  myGamePiece.moveup();
  if (myGameArea.key && myGameArea.key === 40)  myGamePiece.movedown();
  if (myGameArea.key && myGameArea.key === 82)  myGamePiece.rotateRight(); //// FIXME: fix rotate + add control by mouse
  if (myGameArea.key && myGameArea.key === 83)  shot1 = new Shots(10, 10, 'red', myGamePiece.x, myGamePiece.y, 5, 5);



  myGamePiece.newPos();
  shot1.newPos();
  //myGamePiece.angle = 0;
  myGamePiece.update();
  //myGamePiece2.update();
  shot1.update();
};
/////////////////////////////////////////////////
const myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 960; //480;
    this.canvas.height = 540; // 270;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // run the updateGameArea() function every 20th millisecond (50 times per second - the recomended time for action game)
    this.interval = setInterval(updateGameArea, 20);

    //checks if a key is pressed, and set the key property of the myGameArea object to the key code. When the key is released, set the key property to false
    window.addEventListener('keydown',(e) => {
      myGameArea.key = e.keyCode;
      console.dir(myGameArea.key);
    });
    window.addEventListener('keyup', (e) => myGameArea.key = false);
  },

  //clears the entire canvas.
  clear: function() {
    //console.log('clear');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
///////////////////////////////////////////////////////
class Spaceship {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;
    this.color = color;
  }
  //this function define the new position
  newPos () {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  moveup() {
    console.log('moveup');
    this.speedY -= 1;
  }

  movedown() {
    console.log('movedown');
    this.speedY += 1;
  }

  moveleft() {
    this.speedX -= 1;
  }

  moveright() {
    this.speedX += 1;
  }

  stopMove() {
    this.speedX = 0;
    this.speedY = 0;
  }

  rotateRight() {
    this.angle += 1 * Math.PI / 180 ;

  }

  rotateLeft() {
    this.angle -= 1;
  }

  stopRotate() {
    this.angle = 0;
  }

  //this function handle the drawing of the component.
  update () {
    //console.log('update');
    ctx = myGameArea.context;
    // ctx.beginPath();
    // ctx.moveTo(75, 50);
    // ctx.lineTo(100, 75);
    // ctx.lineTo(100, 25);
    // ctx.fill();

    //ctx.save();
    //ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

    ctx.fillRect(this.x, this.y, this.width, this.height);
    //ctx.restore();
  }
}
/////////////////////////////////////////////////////
class Shots {
  constructor(width, height, color, x, y, speedx, speedy) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = speedx;
    this.speedY = speedy;
    this.color = color;
  }
  newPos () {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  //this function handle the drawing of the component.
  update () {
    //console.log('update');
    ctx = myGameArea.context;

    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
