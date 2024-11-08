/**
 * Variation-Jam
 * Junming He
 * 
 */

"use strict";


/**
 * global values 
 * width, height
 */


/**
 * menu
 * scene: which game you choose or are you in menu page
 * text:  text position in menu 
 */

//scene
let scene = {
    menu: "menu",
    game1: "game1",
    game2: "game2",
    game3: "game3"
}

let currentScene;

//text 
let textLocation = {
    top: undefined,
    middle: undefined,
    bottom: undefined,
    center: undefined,
}

//which game user choose
let userChoice = 1;


//---------------------

/**
 * game1 
 * tile size; levelData; rows; cols; offsetX; offsetY; playerX position; playerY position
 * is the player collide with wall;
 */

let tileSize = 80;
let firstGameLevelData = [];
let rows;
let cols;
let offsetX;
let offsetY;
let playerX;
let playerY;
let isFirstTime = true;
let isCollideWithWall = false;
let playerMoveSpeed = 5;


//preload level
function preload() {
    firstGameLevelData = loadStrings('../assets/levels/level0.txt');
}


function setup() {
    createCanvas(1280, 720);


    /**
     * menu
     */
    //set default scene to menu
    currentScene = scene.game1;

    //calculate text location
    let interval = height / 3
    textLocation.top = interval / 2;
    textLocation.middle = textLocation.top + interval;
    textLocation.bottom = textLocation.middle + interval;
    textLocation.center = width / 2;

    /**
     * game1 
     */
    rows = firstGameLevelData.length;
    cols = firstGameLevelData[0].length;
    tileSize = min(width / cols, height / rows); //try to fit the canvas size

    offsetX = (width - cols * tileSize) / 2;
    offsetY = (height - rows * tileSize) / 2;



    //debug 
    console.log(rows, cols, tileSize);

}



function draw() {

    if (currentScene === scene.menu) {
        background(222, 151, 84);
        drawSelectFrame();
        drawMenu();
    }
    else if (currentScene === scene.game1) {
        drawLevels();
        drawPlayer();

        //player input 
        let newPositionX;
        let newPositionY;
        if (keyIsDown(LEFT_ARROW)) {
            //the next position 
            newPositionX = playerX - playerMoveSpeed;
            newPositionY = playerY;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "left")) {
                playerX = newPositionX;
            }

        }

        if (keyIsDown(RIGHT_ARROW)) {
            //the next position 
            newPositionX = playerX + playerMoveSpeed;
            newPositionY = playerY;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "right")) {
                playerX = newPositionX;
            }
        }

        if (keyIsDown(UP_ARROW)) {
            newPositionX = playerX;
            newPositionY = playerY - playerMoveSpeed;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "up")) {
                playerY = newPositionY;
            }
        }

        if (keyIsDown(DOWN_ARROW)) {
            newPositionX = playerX;
            newPositionY = playerY + playerMoveSpeed;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "down")) {
                playerY = newPositionY;
            }
        }

    }
}


/**
 * menu function 
 */

function drawMenu() {
    push();
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(0, 0, 0);
    text("game1", textLocation.center, textLocation.top);
    text("game2", textLocation.center, textLocation.middle);
    text("game3", textLocation.center, textLocation.bottom);
    pop();

}

function drawSelectFrame() {
    push();
    rectMode(CENTER);
    fill(250);
    noStroke();

    switch (userChoice) {
        case 1:
            rect(textLocation.center, textLocation.top, width / 2.5, 120);
            break;

        case 2:
            rect(textLocation.center, textLocation.middle, width / 2.5, 120);
            break;

        case 3:
            rect(textLocation.center, textLocation.bottom, width / 2.5, 120);
            break;
    }
    pop();
}


/**
 * keyboard press
 * keyboard detect in game and in menu
 */

function keyPressed() {
    if (currentScene === scene.menu) {
        if (keyCode === UP_ARROW) {
            if (userChoice === 1) {
                userChoice = 3;
            }
            else {
                userChoice -= 1;
            }
        }

        if (keyCode === DOWN_ARROW) {
            if (userChoice === 3) {
                userChoice = 1;
            }
            else {
                userChoice += 1;
            }
        }
    }

}


/**
 * game1 
 */

function drawLevels() {
    background(30, 165, 225);

    for (let y = 0; y < rows; y++) {
        let colLength = firstGameLevelData[y].length;
        for (let x = 0; x < colLength; x++) {
            let tile = firstGameLevelData[y][x];
            let posX = x * tileSize + offsetX;
            let posY = y * tileSize + offsetY;

            if (tile === "#") {
                // walls 
                push();
                fill(0);
                rect(posX, posY, tileSize, tileSize);
                pop();
            }
            else if (tile === "1") {
                if (isFirstTime) {
                    playerX = posX;
                    playerY = posY;
                    isFirstTime = false;
                }

            }
            else if (tile === " ") {
                continue;
            }
        }
    }
}

function drawPlayer() {
    //player 
    push();
    fill(200, 50, 25);
    ellipse(playerX + tileSize / 2, playerY + tileSize / 2, tileSize / 2);
    pop();
}

function isPlayerCollide(x, y, type, direction) {

    let gridX;
    let gridY;
    if (direction === "left" || direction === "up") {
        //calculate the player position in txt(grid)
        gridX = Math.floor((x - offsetX) / tileSize);
        gridY = Math.floor((y - offsetY) / tileSize);
    }
    else if (direction === "right" || direction === "down") {
        gridX = Math.ceil((x - offsetX) / tileSize);
        gridY = Math.ceil((y - offsetY) / tileSize);
    }


    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
        //check if the next position already exist something
        return firstGameLevelData[gridY][gridX] === type;
    }
    return false;
}