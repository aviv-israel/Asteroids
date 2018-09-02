/* global Component,  */
class Shot extends Component {

  constructor (width, height, color, x, y, velocity, angle) {
    super(width, height, x, y, velocity, angle);
    this.color = color;
  }


  //this function handle the drawing of the component.
  updateDisplay () {
    console.log('update shot');
    ctx = GameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class ShotBySpaceship extends Shot {


    constructor () {
        super(10, 10, 'red', spaceship.x, spaceship.y, spaceship.velocity + 20, spaceship.angle);
        soundList.get('fire').play();
    }

    //this function handle the drawing of the component.
    updateDisplay () {
        console.log('update shot');
        ctx = GameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}
