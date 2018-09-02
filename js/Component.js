/* global Component,GameArea  */
let componentId = 0;
class Component {

  // how to put private
  //static id;

  constructor (width, height, x, y, velocity, angle) {
    this.id = componentId++;
    this.isAlive = true;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.angle = angle;
  }


  // Calculate new position
  newPos () {
    this.x += this.velocity * Math.sin(this.angle);
    this.y -= this.velocity * Math.cos(this.angle);
    //console.log(`newpos ${this.id} ${this.x} ${this.y} ${this.angle}`);
  }

  isOutOfGameArea () {
    const marginGameArea = 10;
    return (this.x < 0 - marginGameArea) ||
      (this.y < 0 - marginGameArea) ||
      (this.x > GameArea.canvas.width + marginGameArea) ||
      (this.y > GameArea.canvas.height + marginGameArea);

  }
}
