# WDI-Project1
# General Assembly Project 1 : Simple front-end game

## Goal: To create the classic arcade game **ASTEROIDS** by HTML5


## Technologies used

* HTML5 + Canvas
* SCSS
* CSS Animation
* Vanilla Javascript (ECMAScript6)
* GitHub

## My Game - Asteroids

![Codémon Logo](/css/images/CODEMON-logo.png)

### Game overview
Asteroids is an arcade space shooter released in 1979 by Atari, Inc. The object of the game is to maneuver your spaceship through space, dodging and destroying asteroids and saucers.

 The object of the game is to destroy all the asteroids on the screen. However, when you shoot an asteroid, it breaks into smaller pieces, which must also be destroyed.


### Game Instructions
Asteroids is a two-dimensional vector shooter.
You control your spaceship and dodging from the asteroid and destroy them. Also, saucer appears periodically and must be dealt with as well.


The controlling by the spaceship using a series of keys:
-  arrow right key  >  - Rotate right
- arrow left key <  - Rotate left
- arrow top key  ^  - Thrust
- space key  - Fire

![<keyboard picture>](/css/images/CODEMON-logo.png)


The playing field consists of your spaceship, floating asteroids, and the occasional alien taking shots at you. You control the spaceship to avoid collisions and to blast obstacles. You start with **3 spaceships**. On the normal machine set up, you earn a free spaceship **every 10,000 points**.

When you start the game, your spaceship will be in the middle of the screen. Heading toward your spaceship will be anywhere five large asteroids. Your job is to blast those rocks. However, * when you blast them, they **break up into 2 medium asteroids**. Blasting a **medium asteroid gives you 2 small asteroids**.*

 In addition, you have to contend with large and small saucers. the small saucers will begin to appear after 10,000 points.

The player wins points in every hit on an asteroid or saucer according to the following way:


| Picture|Attacker            | Points  |
| -------------------|:-------------:| -----:|
| ![icon-l-asteroid](https://user-images.githubusercontent.com/33804499/45213793-7ef7bd80-b290-11e8-8a2f-7903fd4894d8.png) | Large Asteroid | 20 Points |
| ![icon-m-asteroid](https://user-images.githubusercontent.com/33804499/45213832-9e8ee600-b290-11e8-9081-ec635ff2b233.png) |  Medium Asteroid   | 50 Points|
|![icon-s-asteroid](https://user-images.githubusercontent.com/33804499/45213855-ae0e2f00-b290-11e8-8fea-e66bb7d7ef5f.png)|  Small Asteroid    |    100 Points |
|![icon-saucer](https://user-images.githubusercontent.com/33804499/45213902-ced68480-b290-11e8-99e5-e74f6ca128e0.png) |  Large Saucer     |    200 Points |
| ![icon-saucer-small](https://user-images.githubusercontent.com/33804499/45213869-b9f9f100-b290-11e8-94d7-113cbd563c5a.png) |   Small Saucer    |   1000 Points |


### Process

After drawing out my wireframes I identified the four main views the user would
go through to play the game. The most complex of these was the battle itself so
I started there.

I created 2 Codémon characters, some buttons and simple moves to start working on
how the battle mechanics would work. Later on in the project I added in attack
and defence stats as well as attack range to add a degree of randomness to the
game.

Once I had the basic battle functionality working I move onto the user journey
creating the character selection screen and start screen. I added more structure
to my html file and also started to create the css. After I had completed this I
combined the two files into one and began working on refining the game and adding
in animations.

Finally I added the game intro scene with the controllable trainer character.

### Challenges

Even though in the final game there are only three Codémon to choose from there
are a lot of variables and functions to keep track of. This mean that I had to
try and be as consistent as possible with naming conventions and scope. It
was also challenging to find a formula to calculate the result of attacks which
kept the game fair and well paced.

### Wins

Adding the audio, animation, images and timing events really brought the game to
life. Creating the computer player and alternative views when playing against it
was also very rewarding (screen shot of the 1 player game below). I was really
pleased to be able to add additional start screen with the controllable character
as it's a nice callback to the original games and gave me the opportunity to add a more reactive feature.

![screenshot7](/screenshots/screenshot7.png)

## Future features

If I had more time I would work on making the game mobile responsive. It would
also be good to add more characters and a bigger variety of moves, as well as
adding moves which could disable your opponent for a set number of turns.
