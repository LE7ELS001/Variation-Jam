# Variation Jam

Created by Junming He

[View this project online](https://le7els001.github.io/The-Vision/)

## Description

This is my Variation-Jam project. In this project, I create 3 simple games by using P5 JS template.

<h4>GAME 1: Eggcho<h4>
  In this game, you can use UP-ARROW, DOWN-ARROW, LEFT-ARROW, RIGHT-ARROW to move and SPACE key to active echo effect. The collision detect is not so accurate, but this allows users to move more flexibly. At the beginning, I tried to use Math.Ceil() and Math.floor() to make it more accurate, but when the size of the map change, it might cause some bug, for example, the character cannot pass through the gap between two blocks. Due to limited time, I provided multiple endings within one level instead of creating separate levels.

<h4>Game 2: Chameleon<h4>  
  In this game, you can use LEFT-ARROW, RIGHT-ARROW to move and SPACE key to jump. When your character is gray, touching the red, blue, or green corresponding tiles will change your character to that respective color. You can pass through tiles of the same color but will be blocked by tiles of different colors. Touching a gray tile will turn you back to gray. I make two levels for this game. The collision detect is more accurate in this game but map size is a huge liability, lots of value related to the size of the map. I struggled for a long time with the collision between the character and the floor, and found that due to the change in map size, the previous gravity and jump values became very different. Due to time and technical limitations, I can only control the map size and adjust the gravity variable. 

<h4>Game 3: Treasure<h4>
  In this game, use W A S D to move player 1; use UP-ARROW, DOWN-ARROW, LEFT-ARROW, RIGHT-ARROW to move player 2. When your character touch the mechanism floor, the relevant door will open. In this project, I used label to connect the door and mechanism. About the door animation, I tried to change the size at the beginning, but found that the tiles' original X, Y is on the left top, so I change the color alpha value to implement that.    
  

## Credits

This bit should describe what tools were used. For example:

This project uses [p5.js](https://p5js.org).

## Attribution

This bit should attribute any assets or other elements used taken from other sources. For example:

The fish images were sourced from the [Creative Commons image "Georgia Aquarium Fish"](https://search.creativecommons.org/photos/96f6f770-eac1-488c-8abb-16bee7bcc874) by Mike Johnston which is licensed with CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/.
