class Shot extends Component {

  constructor(width, height, color, x, y, speed, angle) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.color = color;
  }
  newPos () {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
    console.log(`newpos shot ${this.x} ${this.y} ${this.angle}`);
  }

  //this function handle the drawing of the component.
  update () {
    console.log('update shot');
    ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
