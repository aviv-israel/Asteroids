/* global Component,  */
class Shot extends Component {

  constructor (width, height, color, x, y, velocity, angle) {
    super(width, height, x, y, velocity, angle);
    this.color = color;
  }


  //this function handle the drawing of the component.
  update () {
    console.log('update shot');
    ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
