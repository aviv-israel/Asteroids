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

  get id () {
    return this._id;
  }

  isOutOfGameArea () {
    const marginGameArea = 10;
    return (this.x < 0 - marginGameArea) ||
      (this.y < 0 - marginGameArea) ||
      (this.x > GameArea.canvas.width + marginGameArea) ||
      (this.y > GameArea.canvas.height + marginGameArea);

  }
}
