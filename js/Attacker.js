/* global Component, Attacker  */

class Attacker extends Component{
  constructor(width, height, x, y, velocity, angle) {
    super(width, height, x, y, velocity, angle);

  }

  relocate () {
    console.log('relocate');
    if (this.x < 0)
      this.x = GameArea.canvas.width;
    if (this.y < 0)
      this.y = GameArea.canvas.height;
    if (this.x > GameArea.canvas.width)
      this.x = 0;
    if (this.y > GameArea.canvas.height)
      this.y = 0;
  }

}
