/* global Component,GameArea  */
let componentId = 0;
class Component {

  constructor (width, height, x, y, velocity, angle) {
    this._id = componentId++;
    this.width = width; //to delete
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.angle = angle;
  }
  // constructor ( x, y, raduis, angle) {
  //   this._id = componentId++;
  //   this.x = x;
  //   this.y = y;
  //   this.raduis = raduis;
  //   this.angle = angle;
  // }
  get id () {
    return this._id;
  }


  // Calculate new position
  // newPos () {
  //   this.x += this.velocity * Math.sin(this.angle);
  //   this.y -= this.velocity * Math.cos(this.angle);
  //   console.log(`blabla newpos ${this.id} ${this.x} ${this.y} ${this.angle}`);
  // }

  isOutOfGameArea () {
    const marginGameArea = 10;
    return (this.x < 0 - marginGameArea) ||
      (this.y < 0 - marginGameArea) ||
      (this.x > GameArea.canvas.width + marginGameArea) ||
      (this.y > GameArea.canvas.height + marginGameArea);

  }
}
