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
 * is the player collide with something;
 * the echo, active echo wave or not
 * image: egg
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
let isPlayerMove = true;

let isFirstTimeCalculate = true;
let outisdeDiameter = 1500;

let insideDiameter = 35;
let originInsideDiameter = 35;

let insideVertex = [];
let outsideVertex = [];
let ScaleSpeed = 8;
let isStartScale = false;
let echoColor = {
    alpha: 255,
    defaultAlpha: 255,
    speed: 10,
    alphaFadingSpeed: 5,
    R: 0,
    G: 0,
    B: 0,
}
let activeEchoWave = false;
let activeColorFading = false;

let egg;
let pen;
let plant;
let color;
let philosophy;
let chicken;
let river;

//preload level / image
function preload() {
    firstGameLevelData = loadStrings('../assets/levels/level.txt');
    egg = loadImage("../assets/images/egg.png");
    pen = loadImage("../assets/images/pen.png");
    plant = loadImage("../assets/images/plant.png");
    color = loadImage("../assets/images/color.png");
    philosophy = loadImage("../assets/images/philosophy.png");
    chicken = loadImage("../assets/images/chicken.png");
    river = loadImage("../assets/images/river.png");
}


function setup() {
    createCanvas(1280, 720);

    let centerX = width / 2;
    let centerY = height / 2;

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
        drawEcho();
        drawPlayer();
        playerInput();
        echoWave();
        echoColorFading();



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
 * keyboard release 
 * use in echo 
 */

function keyReleased() {
    if (currentScene === scene.game1) {

        if (keyCode === 32) {
            activeEchoWave = true;
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
                drawWall(posX, posY);
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
            else if (tile === "2") {
                drawTarget(posX, posY, pen);
            }
            else if (tile === "3") {
                drawTarget(posX, posY, plant);
            }
            else if (tile === "4") {
                drawTarget(posX, posY, chicken);
            }
            else if (tile === "5") {
                drawTarget(posX, posY, philosophy);
            }
            else if (tile === "6") {
                drawTarget(posX, posY, river);
            }
            else if (tile === "7") {
                drawTarget(posX, posY, color);
            }
        }
    }
}

function drawPlayer() {
    image(egg, playerX, playerY, tileSize, tileSize, 0, 0, egg.width, egg.height);
}

function isPlayerCollide(x, y, type, direction) {

    let gridX;
    let gridY;
    let buffer = 2;
    if (direction === "left" || direction === "up" || direction === "right" || direction === "down") {
        //calculate the player position in txt(grid)
        gridX = Math.round((x - offsetX + buffer) / tileSize);
        gridY = Math.round((y - offsetY + buffer) / tileSize);
    }



    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
        //check if the next position already exist something
        return firstGameLevelData[gridY][gridX] === type;
    }
    return false;
}

//echo effect 
function drawEcho() {

    //only calculate once 
    if (isFirstTimeCalculate) {
        for (let angle = 0; angle <= TWO_PI; angle += 0.001) {
            let x = playerX + tileSize / 2 + Math.cos(angle) * outisdeDiameter;
            let y = playerY + tileSize / 2 + Math.sin(angle) * outisdeDiameter;
            outsideVertex.push({ x, y });
        }

        for (let angle = TWO_PI; angle >= 0; angle -= 0.001) {
            let x = playerX + tileSize / 2 + Math.cos(angle) * insideDiameter;
            let y = playerY + tileSize / 2 + Math.sin(angle) * insideDiameter;
            insideVertex.push({ x, y });
        }


        isFirstTimeCalculate = false;
    }


    push();
    stroke(echoColor.R, echoColor.G, echoColor.B, echoColor.alpha);
    fill(echoColor.R, echoColor.G, echoColor.B, echoColor.alpha);


    beginShape();
    for (let outsidePoint of outsideVertex) {
        vertex(outsidePoint.x, outsidePoint.y);
    }

    for (let insidePoint of insideVertex) {
        vertex(insidePoint.x, insidePoint.y);
    }



    endShape(CLOSE);

    pop();
}

function updatePoints(direction) {
    if (direction === "left") {
        outsideVertex.forEach(point => {
            point.x -= playerMoveSpeed;
        });
        insideVertex.forEach(point => {
            point.x -= playerMoveSpeed;
        })
    }
    else if (direction === "right") {
        outsideVertex.forEach(point => {
            point.x += playerMoveSpeed;
        });
        insideVertex.forEach(point => {
            point.x += playerMoveSpeed;
        })
    }
    else if (direction === "up") {
        outsideVertex.forEach(point => {
            point.y -= playerMoveSpeed;
        });
        insideVertex.forEach(point => {
            point.y -= playerMoveSpeed;
        })
    }
    else if (direction === "down") {
        outsideVertex.forEach(point => {
            point.y += playerMoveSpeed;
        });
        insideVertex.forEach(point => {
            point.y += playerMoveSpeed;
        })
    }
    else if (direction === "echo") {
        insideVertex = [];
        for (let angle = TWO_PI; angle >= 0; angle -= 0.001) {
            let x = playerX + tileSize / 2 + Math.cos(angle) * insideDiameter;
            let y = playerY + tileSize / 2 + Math.sin(angle) * insideDiameter;
            insideVertex.push({ x, y });
        }

    }

}

function playerInput() {
    //player input 
    let newPositionX;
    let newPositionY;
    if (keyIsDown(LEFT_ARROW)) {



        //the next position 
        newPositionX = playerX - playerMoveSpeed;
        newPositionY = playerY;

        if (!isPlayerCollide(newPositionX, newPositionY, "#", "left")) {
            updatePoints("left");
            playerX = newPositionX;
        }


    }

    if (keyIsDown(RIGHT_ARROW)) {



        //the next position 
        newPositionX = playerX + playerMoveSpeed;
        newPositionY = playerY;

        if (!isPlayerCollide(newPositionX, newPositionY, "#", "right")) {
            updatePoints("right");
            playerX = newPositionX;
        }
    }

    if (keyIsDown(UP_ARROW)) {



        newPositionX = playerX;
        newPositionY = playerY - playerMoveSpeed;

        if (!isPlayerCollide(newPositionX, newPositionY, "#", "up")) {
            updatePoints("up");
            playerY = newPositionY;
        }
    }

    if (keyIsDown(DOWN_ARROW)) {




        newPositionX = playerX;
        newPositionY = playerY + playerMoveSpeed;

        if (!isPlayerCollide(newPositionX, newPositionY, "#", "down")) {
            updatePoints("down");
            playerY = newPositionY;
        }
    }


}

function echoWave() {
    if (activeEchoWave) {

        insideDiameter += ScaleSpeed;

        if (insideDiameter >= outisdeDiameter) {
            insideDiameter = originInsideDiameter;
            activeEchoWave = false;

            echoColor.alpha = 0;
            activeColorFading = true;
        }
        updatePoints("echo");
    }
}

function echoColorFading() {
    if (activeColorFading) {
        echoColor.alpha += echoColor.alphaFadingSpeed;

        if (echoColor.alpha >= echoColor.defaultAlpha) {
            echoColor.alpha = echoColor.defaultAlpha;
            activeColorFading = false;
        }

    }
}

function drawWall(x, y) {
    push();
    fill(0);
    rect(x, y, tileSize, tileSize);
    pop();
}

function drawTarget(x, y, photo) {
    image(photo, x, y, tileSize, tileSize, 0, 0, photo.width, photo.height);
}