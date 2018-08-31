class Astroid extends Attacker {
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
  crashWith (otherobj) {
    const myleft  = this.x,
      myright     = this.x + (this.width),
      mytop       = this.y,
      mybottom    = this.y + (this.height),
      otherleft   = otherobj.x,
      otherright  = otherobj.x + (otherobj.width),
      othertop    = otherobj.y,
      otherbottom = otherobj.y + (otherobj.height);

    return !((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright));

  }

  newPos () {
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
    console.log(`newpos astroid ${this.x} ${this.y} ${this.angle}`);
  }

  //this function handle the drawing of the component.
  update () {
    console.log('update shot');
    ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
