/* global Spaceship,Shot,Attacker,Asteroid,GameArea,Game  */

let game;

document.addEventListener('DOMContentLoaded',() => {
  console.log('start game');
  game = new Game();
  Game.init();



});
