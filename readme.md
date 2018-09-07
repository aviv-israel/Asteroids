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

![asteroids_logo](https://user-images.githubusercontent.com/33804499/45214690-0a724e00-b293-11e8-82f1-7e0011b79cc0.png)

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


The playing field consists of your spaceship, floating asteroids, and the occasional alien taking shots at you. You control the spaceship to avoid collisions and to blast obstacles. You start with **3 spaceships**. On the normal machine set up, you earn a free spaceship **every 10,000 points**.

When you start the game, your spaceship will be in the middle of the screen. Heading toward your spaceship will be anywhere five large asteroids. Your job is to blast those rocks. However, * when you blast them, they **break up into 2 medium asteroids**. Blasting a **medium asteroid gives you 2 small asteroids**.*
 <img width="1680" alt="screen with bigsaucer" src="https://user-images.githubusercontent.com/33804499/45215331-17903c80-b295-11e8-869e-93ce7fbb1659.png">


 In addition, you have to contend with large and small saucers. the small saucers will begin to appear after 10,000 points.



The player wins points in every hit on an asteroid or saucer according to the following way:


| Picture|Attacker            | Points  |
| -------------------|:-------------:| -----:|
| ![icon-l-asteroid](https://user-images.githubusercontent.com/33804499/45213793-7ef7bd80-b290-11e8-8a2f-7903fd4894d8.png) | Large Asteroid | 20 Points |
| ![icon-m-asteroid](https://user-images.githubusercontent.com/33804499/45213832-9e8ee600-b290-11e8-9081-ec635ff2b233.png) |  Medium Asteroid   | 50 Points|
|![icon-s-asteroid](https://user-images.githubusercontent.com/33804499/45213855-ae0e2f00-b290-11e8-8fea-e66bb7d7ef5f.png)|  Small Asteroid    |    100 Points |
|![icon-saucer](https://user-images.githubusercontent.com/33804499/45213902-ced68480-b290-11e8-99e5-e74f6ca128e0.png) |  Large Saucer     |    200 Points |
| ![icon-saucer-small](https://user-images.githubusercontent.com/33804499/45213869-b9f9f100-b290-11e8-94d7-113cbd563c5a.png) |   Small Saucer    |   1000 Points |


Keep in mind a couple of things when shooting:
* You can have 4 shots on the screen at any one time. This is useful for when you are blasting rocks at close range. You can pretty much drill them to dust.
* Your shots "wrap around" the screen. This means any shot that goes past the edge of the screen will reappear on the opposite side traveling the same direction. The saucers also have "wrap around" shots.


### Process

In the first stage I planned how the game was going to look, this step required understanding how the original game worked precisely, what technologies could be used to build the game and the class structure of the game.

In the second stage, I set my goals to MVP to make sure that the technology I chose was suitable for building the game.

At the development stage I developed the following order:
1. Set the UI of the game
2. Development of spaceship
3. Develop the possibility to shoot by spaceship
4. Develop the asteroids (including their explosion into different parts and their creation in a different way).
5. Develop the possibility to score, level and lives.
6. Developing the saucer
7. Add sound and improve UI


### Challenges

One of the challenges in designing and building the game is to understand how the original game works behind the scenes and looks as similar as possible to the original game of Atari.

Another challenge is to work with a canvas technology that requires drawing each object in a vector way.

### Wins

Learning of canvas technology, how it works and how to correctly use technology for developing games.

## Future features

- Mobile support - Displays on-screen goiks to control the spaceship
- Adding an option to save the results locally or on DB.
- Added an option to login.
- Added an additional UI option that is innovative and colorful.
