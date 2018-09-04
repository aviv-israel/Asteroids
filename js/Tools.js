const DUR_BLINK_ON = 0.5;
let blinkTime = 0,
  blinkOn = false;


class Tool {


  static isBlinkOn () {
    if (blinkTime === 0){
      blinkTime = Math.ceil(DUR_BLINK_ON * GameArea.FPS);
      blinkOn = !blinkOn;
    }
    --blinkTime;
    return blinkOn;
  }



}



const distBetweenPoints = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
