/* global Spaceship,Shot,Attacker,Asteroid,GameArea,Game  */

const game = new Game();


document.addEventListener('DOMContentLoaded',() => {

  // Init the game
  Game.init();

  // Selectors
  const section = document.querySelector('.info');
  const aBeginGame = document.querySelector('#begin-game');
  const volume = document.querySelector('.volume');

  // Events listener
  window.addEventListener('scroll', (e) => {
    if (e.timeStamp >70 && Game.isStepPre()){
      changeToStyleStepReady();
    }
  });

  aBeginGame.addEventListener('click', (e) => {
    if (Game.isStepPre()){
      changeToStyleStepReady();
    }
  });

  volume.addEventListener('click', (e) => {
    if (Sound.isActive) {
      Sound.isActive = false;
      volume.classList.remove('is-active');
      volume.classList.add('is-inactive');
    } else {
      Sound.isActive = true;
      volume.classList.remove('is-inactive');
      volume.classList.add('is-active');
    }


  });




  // Functions
  const changeToStyleStepReady = () => {
    GameArea.canvas.classList.add('is-active');
    section.classList.add('is-inactive');
    setTimeout(() => Game.turnStepReady(), 1000);
  }

});
