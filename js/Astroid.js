/* global Component, Attacker  */

class Astroid extends Attacker {
  constructor(width, height, color, x, y, velocity, angle) {
    super(width, height, x, y, velocity, angle);
    this.color = color;
  }

  crashWith (otherobj) {
    const myLeft  = this.x,
      myRight     = this.x + (this.width),
      myTop       = this.y,
      myBottom    = this.y + (this.height),
      otherLeft   = otherobj.x,
      otherRight  = otherobj.x + (otherobj.width),
      otherTop    = otherobj.y,
      otherBottom = otherobj.y + (otherobj.height);

    return !((myBottom < otherTop) ||
           (myTop > otherBottom) ||
           (myRight < otherLeft) ||
           (myLeft > otherRight));

  }

  //this function handle the drawing of the component.
  update () {
    ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
