/**
 * Variation-Jam
 * Junming He
 * 
 * 
 * use UP-ARROW and DOWN-ARROW to choose the game, press ENTER to start
 * 
 * game 1 :
 * use UP-ARROW, DOWN-ARROW, LEFT-ARROW, RIGHT-ARROW to move 
 * press SPACE key to use echo to see the path 
 * multiple ending
 * have fun
 * 
 * game 2: 
 * use LEFT-ARROW, RIGHT-ARROW to move
 * press SPACE key to jump 
 * When your character is gray, touching the red, blue, or green corresponding tiles will change your character to that respective color.
 * You can pass through tiles of the same color but will be blocked by tiles of different colors. Touching a gray tile will turn you back to gray.
 * there are 2 levels 
 * have fun
 * 
 * game 3 
 * Recommended for two players (but you can play solo, of course).
 * use W A S D to move player 1; use UP-ARROW, DOWN-ARROW, LEFT-ARROW, RIGHT-ARROW to move player 2
 * when your character touch the mechanism floor, the relevant door will open 
 * two players need to reach the destination together to win 
 * have fun 
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
    gameOver1: "gameOver1",
    game2: "game2",
    gameOver2: "gameOver2",
    game3: "game3",
    gameOver3: "gameOver3"
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

//window center position 
let centerX;
let centerY;

//---------------------

/**
 * game1 
 * tile size; levelData; rows; cols; offsetX; offsetY; playerX position; playerY position
 * is the player collide with something;
 * the echo, active echo wave or not
 * image: egg
 * ending
 */

let tileSize = 1;
let firstGameLevelData = [];
let rows;
let cols;
let offsetX;
let offsetY;
let playerX;
let playerY;

let isFirstTime = true;
let isCollideWithWall = false;
let playerMoveSpeed = 2.7;
let isPlayerMove = true;

let isFirstTimeCalculate = true;
let outisdeDiameter = 1500;

let insideDiameter = 15;
let originInsideDiameter = 15;

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
let spoon;

let ending = 0;


/**
     * game2
     * map icon 
     * player 
     */

let secondGameLevelData = [];
let secondGameLevelData2 = [];

let flag;

let game2Map = {
    rows: undefined,
    cols: undefined,

    //try to fit the canvas size
    tileSize: undefined,

    offsetX: undefined,
    offsetY: undefined,
}

let game2Player = {
    isFirstTime: true,
    playerX: undefined,
    playerY: undefined,
    R: 120,
    G: 120,
    B: 120,
    moveSpeed: 4,
    originX: undefined,
    originY: undefined,
    gravity: 0.25,
    velocity: 0,
    jumpHeight: -8,
    onTheGround: true,
    isJumping: false

}


let walls = [];
let RedBrick = [];
let GreenBrick = [];
let BlueBrick = [];
let greyBrick = [];
let goal = [];

let game2Level = 1;


/**
 * game 3 
 * player
 * map
 */

let thirdGameLevelData1 = [];

let game3Players = {

    //player position
    player1X: undefined,
    player1Y: undefined,
    player2X: undefined,
    player2Y: undefined,

    //player 1 color 
    player1Color: {

        R: 230,
        G: 28,
        B: 23,
    },

    //player 2 color 
    player2Color: {
        R: 45,
        G: 50,
        B: 230,
    },

    //move speed 
    moveSpeed: 2,


}

let player1ActivedMechanism = null;
let player1StandInDoor = null;

let player2ActivedMechanism = null;
let player2StandInDoor = null;

let player1ReachDestination = false;
let player2ReachDestination = false;

let game3Map = {
    rows: undefined,
    cols: undefined,

    //try to fit the canvas size
    tileSize: undefined,

    offsetX: undefined,
    offsetY: undefined,
}

//image
let treasure;

//level 
let game3Level = 2;

//bricks 
let game3bricks = [];
let destinations = [];

let mechanisms = [];
let doors = []

//label 
let labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

//label color for door
let labelsDoorColor = {

    A: { R: 211, G: 46, B: 230, A: 255 },
    B: { R: 104, G: 32, B: 245, A: 255 },
    C: { R: 42, G: 187, B: 245, A: 255 },
    D: { R: 66, G: 245, B: 184, A: 255 },
    E: { R: 70, G: 245, B: 32, A: 255 },
    F: { R: 244, G: 135, B: 26, A: 255 },
    G: { R: 244, G: 89, B: 61, A: 255 },
    H: { R: 245, G: 27, B: 141, A: 255 },
    I: { R: 203, G: 245, B: 76, A: 255 },
};

//label color for mechanism 
let labelsMechanismColor = {

    A: "rgb(211, 46, 230)",
    B: "rgb(104,32,245)",
    C: "rgb(42,187,245)",
    D: "rgb(66,245,184)",
    E: "rgb(70,245,32)",
    F: "rgb(244,135,26)",
    G: "rgb(244,89,61)",
    H: "rgb(245,27,141)",
    I: "rgb(203,245,76)",
};


let doorAnimationSpeed = 5;








//preload level / image
function preload() {
    // game 1
    firstGameLevelData = loadStrings("../assets/levels/level.txt");
    egg = loadImage("../assets/images/egg.png");
    pen = loadImage("../assets/images/pen.png");
    plant = loadImage("../assets/images/plant.png");
    color = loadImage("../assets/images/color.png");
    philosophy = loadImage("../assets/images/philosophy.png");
    chicken = loadImage("../assets/images/chicken.png");
    spoon = loadImage("../assets/images/spoon.png");

    //game 2 
    secondGameLevelData = loadStrings("../assets/levels/2-level.txt");
    secondGameLevelData2 = loadStrings("../assets/levels/2-level2.txt");
    flag = loadImage("../assets/images/flag.png");


    //game 3 
    thirdGameLevelData1 = loadStrings("../assets/levels/3-level.txt");
    treasure = loadImage("../assets/images/Treasure_Chest.png");
}


function setup() {
    createCanvas(1280, 720);

    centerX = width / 2;
    centerY = height / 2;

    /**
     * menu
     */
    //set default scene to menu
    currentScene = scene.menu;


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


    /**
     * game2 
     */

    //load map1 as default
    game2Map.rows = secondGameLevelData.length;
    game2Map.cols = secondGameLevelData[0].length;

    //try to fit the canvas size
    game2Map.tileSize = min(width / game2Map.cols, height / game2Map.rows);

    game2Map.offsetX = (width - game2Map.cols * game2Map.tileSize) / 2;
    game2Map.offsetY = (height - game2Map.rows * game2Map.tileSize) / 2;

    //get all bricks position
    for (let y = 0; y < game2Map.rows; y++) {
        let colLength = secondGameLevelData[y].length;
        for (let x = 0; x < colLength; x++) {
            let tile = secondGameLevelData[y][x];
            let posX = x * game2Map.tileSize + game2Map.offsetX;
            let posY = y * game2Map.tileSize + game2Map.offsetY;
            if (tile === "#") {
                // walls 
                walls.push({ posX, posY });
            }
            else if (tile === "1") {
                game2Player.originX = posX;
                game2Player.originY = posY;
                game2Player.playerX = posX;
                game2Player.playerY = posY;
            }
            else if (tile === " ") {
                continue;
            }
            else if (tile === "0") {
                greyBrick.push({ posX, posY });
            }
            else if (tile === "2") {
                RedBrick.push({ posX, posY });
            }
            else if (tile === "3") {
                GreenBrick.push({ posX, posY });
            }
            else if (tile === "4") {
                BlueBrick.push({ posX, posY });
            }
            else if (tile === "5") {
                goal.push({ posX, posY });
            }

        }
    }

    /**
     * game3 
     * label color
     */

    //load map1 as default
    game3Map.rows = thirdGameLevelData1.length;
    game3Map.cols = thirdGameLevelData1[0].length;


    //try to fit the canvas size
    game3Map.tileSize = min(width / game3Map.cols, height / game3Map.rows);

    game3Map.offsetX = (width - game3Map.cols * game3Map.tileSize) / 2;
    game3Map.offsetY = (height - game3Map.rows * game3Map.tileSize) / 2;

    //get all bricks position
    for (let y = 0; y < game3Map.rows; y++) {
        let colLength = thirdGameLevelData1[y].length;
        for (let x = 0; x < colLength; x++) {
            let tile = thirdGameLevelData1[y][x];
            let posX = x * game3Map.tileSize + game3Map.offsetX;
            let posY = y * game3Map.tileSize + game3Map.offsetY;
            if (tile === "#") {
                // walls 
                game3bricks.push({ posX, posY });
            }
            else if (tile === " ") {
                continue;
            }
            else if (tile === "0") {
                destinations.push({ posX, posY });
            }
            //player 1 position 
            else if (tile === "1") {
                game3Players.player1X = posX;
                game3Players.player1Y = posY;
            }
            //player 2 position 
            else if (tile === "2") {
                game3Players.player2X = posX;
                game3Players.player2Y = posY;
            }

            //mechanisms and doors
            for (let lb of labels) {
                let lowerCaseLB = lb.toLowerCase();
                if (tile === lb) {
                    mechanisms.push({ label: lb, posX, posY });
                }
                else if (tile === lowerCaseLB) {
                    doors.push({ label: lb, posX, posY, isOpen: false });
                }
            }



        }
    }






    //debug 
    //console.log(rows, cols, tileSize);

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
    else if (currentScene === scene.gameOver1) {
        drawGameOverText();
    }
    else if (currentScene === scene.game2) {
        drawGame2Levels();
        drawGame2Player();
        playerInput();
        applyGravity();
    }
    else if (currentScene === scene.gameOver2) {
        drawGame2OverText();
    }
    else if (currentScene === scene.game3) {
        drawGame3Level();
        drawPlayerOne();
        drawPlayerTwo();
        playerInput();
        triggerDetection(game3Players.player1X, game3Players.player1Y, 1);
        triggerDetection(game3Players.player2X, game3Players.player2Y, 2);
        doorAnimation();
        GameOver3();
        //console.log(player1ReachDestination);


        //check player collision

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
    text("Eggcho", textLocation.center, textLocation.top);
    text("Chameleon", textLocation.center, textLocation.middle);
    text("Treasure", textLocation.center, textLocation.bottom);
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
 * keyboard detect in menu in gameOver statement 
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

        if (keyCode === ENTER) {
            if (userChoice === 1) {
                currentScene = scene.game1;
                return;
            }
            else if (userChoice === 2) {
                currentScene = scene.game2;
                return;
            }
            else if (userChoice === 3) {
                currentScene = scene.game3;
                return;
            }
        }
    }

    if (currentScene === scene.gameOver1) {
        if (keyCode === ENTER) {

            //reset calculate and position
            isFirstTimeCalculate = true;
            isFirstTime = true;

            currentScene = scene.game1;
        }

        // ESC
        if (keyCode === 27) {

            isFirstTimeCalculate = true;
            isFirstTime = true;
            currentScene = scene.menu;
        }
    }

    //game2 jumping
    if (currentScene === scene.game2) {
        // player only can jump when he stands on a platform
        if (keyCode === 32 && game2Player.onTheGround && !game2Player.isJumping) {
            game2Player.onTheGround = false;
            game2Player.velocity = game2Player.jumpHeight;
            game2Player.isJumping = true;
        }
    }


    //game2 game over choose 
    if (currentScene === scene.gameOver2) {
        if (game2Level === 1) {

            if (keyCode === ESCAPE) {
                //back to menu and reset to first level
                game2Level = 1;
                ReloadLevels();
                currentScene = scene.menu;
                return;
                //console.log("ESC");
            }
            else if (keyCode === ENTER) {

                //load next level
                game2Level = 2;
                ReloadLevels();
                currentScene = scene.game2;
                return;

                //console.log("ENTER");
            }
        }
        if (game2Level === 2) {
            if (keyCode === ENTER) {

                //back to menu and reset to first level
                currentScene = scene.menu;
                game2Level = 1;
                ReloadLevels();
                return;
                //console.log("ENTER")

            }
        }
    }

    //game3 game over choose 
    if (currentScene === scene.gameOver3) {
        if (keyCode === ENTER) {

            //back to menu 
            currentScene = scene.menu;
            return;
            //console.log("ENTER")

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
                drawWall(posX, posY, tileSize);
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
                drawTarget(posX, posY, spoon);
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

/**
 * this function is the second version 
 * in the first version calculation should divide into Math.ceil and Math.floor, but it will bring some problems
 * and this collision check allows user to move more flexibly 
 */
function isPlayerCollide(x, y, type, direction) {

    let gridX;
    let gridY;
    let buffer = 2;
    if (direction === "left" || direction === "up" || direction === "right" || direction === "down") {
        //calculate the player position in txt(grid)
        gridX = Math.round((x - offsetX + buffer) / tileSize);
        gridY = Math.round((y - offsetY + buffer) / tileSize);

        //debug
        //console.log("The input direction is:", direction);
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
        outsideVertex = [];
        insideVertex = [];
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

    //for another player in game3
    let newPositionX2;
    let newPositionY2;



    if (keyIsDown(LEFT_ARROW)) {
        //game1 
        if (currentScene === scene.game1) {

            //the next position 
            newPositionX = playerX - playerMoveSpeed;
            newPositionY = playerY;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "left")) {
                updatePoints("left");
                playerX = newPositionX;
            }

            if (isPlayerCollide(newPositionX, newPositionY, "2", "left")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 2;
            }

            if (isPlayerCollide(newPositionX, newPositionY, "3", "left")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 3;
            }
        }

        //game2
        if (currentScene === scene.game2) {
            newPositionX = game2Player.playerX - game2Player.moveSpeed;
            newPositionY = game2Player.playerY;


            if (game2CanMove(newPositionX, newPositionY)) {
                game2Player.playerX = newPositionX;
            }


        }

        //game3 player2 
        if (currentScene === scene.game3) {
            newPositionX = game3Players.player2X - game3Players.moveSpeed;
            newPositionY = game3Players.player2Y;

            if (game3CanMove(newPositionX, newPositionY, "left")) {

                game3Players.player2X = newPositionX;
            }
        }


    }

    if (keyIsDown(RIGHT_ARROW)) {


        // game 1
        if (currentScene === scene.game1) {

            //the next position 
            newPositionX = playerX + playerMoveSpeed;
            newPositionY = playerY;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "right")) {
                updatePoints("right");
                playerX = newPositionX;
            }
        }

        //game2
        if (currentScene === scene.game2) {
            newPositionX = game2Player.playerX + game2Player.moveSpeed;
            newPositionY = game2Player.playerY;


            if (game2CanMove(newPositionX, newPositionY)) {
                game2Player.playerX = newPositionX;

            }



        }

        //game3 player 2 
        if (currentScene === scene.game3) {
            newPositionX = game3Players.player2X + game3Players.moveSpeed;
            newPositionY = game3Players.player2Y;

            if (game3CanMove(newPositionX, newPositionY, "right")) {

                game3Players.player2X = newPositionX;
            }
        }
    }

    if (keyIsDown(UP_ARROW)) {


        if (currentScene === scene.game1) {

            newPositionX = playerX;
            newPositionY = playerY - playerMoveSpeed;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "up")) {
                updatePoints("up");
                playerY = newPositionY;
            }
            if (isPlayerCollide(newPositionX, newPositionY, "6", "down")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 6;
            }

            if (isPlayerCollide(newPositionX, newPositionY, "7", "down")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 7;
            }
        }

        //game3 player 2 
        if (currentScene === scene.game3) {

            newPositionX = game3Players.player2X;
            newPositionY = game3Players.player2Y - game3Players.moveSpeed;
            if (game3CanMove(newPositionX, newPositionY, "up")) {

                game3Players.player2Y = newPositionY;
            }
        }

    }

    if (keyIsDown(DOWN_ARROW)) {




        if (currentScene === scene.game1) {

            newPositionX = playerX;
            newPositionY = playerY + playerMoveSpeed;

            if (!isPlayerCollide(newPositionX, newPositionY, "#", "down")) {
                updatePoints("down");
                playerY = newPositionY;
            }

            if (isPlayerCollide(newPositionX, newPositionY, "4", "down")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 4;
            }

            if (isPlayerCollide(newPositionX, newPositionY, "5", "down")) {
                currentScene = scene.gameOver1;
                // which ending player has 
                ending = 5;
            }
        }


        //game3 player 2 
        if (currentScene === scene.game3) {
            newPositionX = game3Players.player2X;
            newPositionY = game3Players.player2Y + game3Players.moveSpeed;
            if (game3CanMove(newPositionX, newPositionY, "down")) {

                game3Players.player2Y = newPositionY;
            }
        }

    }


    /**
     * Game3 Player1 control
     */

    // A key 
    if (keyIsDown(65)) {
        if (currentScene === scene.game3) {


            newPositionX2 = game3Players.player1X - game3Players.moveSpeed;
            newPositionY2 = game3Players.player1Y;

            if (game3CanMove(newPositionX2, newPositionY2, "a")) {

                game3Players.player1X = newPositionX2;
            }
        }
    }

    //D key 
    if (keyIsDown(68)) {
        if (currentScene === scene.game3) {
            newPositionX2 = game3Players.player1X + game3Players.moveSpeed;
            newPositionY2 = game3Players.player1Y;

            if (game3CanMove(newPositionX2, newPositionY2, "d")) {

                game3Players.player1X = newPositionX2;
            }
        }

    }

    //W key 
    if (keyIsDown(87)) {
        if (currentScene === scene.game3) {

            newPositionX2 = game3Players.player1X;
            newPositionY2 = game3Players.player1Y - game3Players.moveSpeed;
            if (game3CanMove(newPositionX2, newPositionY2, "w")) {

                game3Players.player1Y = newPositionY2;
            }
        }
    }

    if (keyIsDown(83)) {
        if (currentScene === scene.game3) {
            newPositionX = game3Players.player1X;
            newPositionY = game3Players.player1Y + game3Players.moveSpeed;
            if (game3CanMove(newPositionX, newPositionY, "s")) {

                game3Players.player1Y = newPositionY;
            }
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

function drawWall(x, y, Size) {
    push();
    fill(0);
    rect(x, y, Size, Size);
    pop();
}

function drawTarget(x, y, photo) {
    image(photo, x, y, tileSize, tileSize, 0, 0, photo.width, photo.height);
}

function drawGameOverText() {

    switch (ending) {
        case 2:
            background(245, 90, 42);
            endingText("You encounter Leonardo da Vinci and become his model for painting practice.", pen);
            break;
        case 3:
            background(180, 233, 245);
            endingText("You found a plant, you are an eggplant now.", plant);
            break;
        case 4:
            background(245, 141, 59);
            endingText("You find your way home, east or west, home is the best, isn't it?", chicken);
            break;
        case 5:
            background(42, 109, 245);
            endingText("You found Aristotle, and now he plans to discuss the age-old philosophical question of whether the chicken or the egg came first with you.", philosophy);
            break;
        case 6:
            background(245, 52, 52);
            endingText("You discovered a group of children playing an egg-and-spoon race, and you felt relieved that you didn't have to participate in such a dangerous activity.", spoon);
            break;
        case 7:
            background(180, 120, 210);
            endingText("You discovered paints hidden in a secret spot, and after that, you've become an Easter egg.", color);

    }

}

function endingText(endingText, photo) {

    //ending image
    image(photo, width / 2.7, height / 20, 200, 200, 0, 0, photo.width, photo.height);

    //ending text
    push();
    textSize(50);
    textAlign(CENTER, CENTER);
    textWrap(WORD);
    fill(0, 0, 0);
    text(endingText, width / 2 / 2, height / 2.7, 652,);
    pop();

    //continue text 
    push();
    textSize(25);
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text("Press 'ENTER' to try again", width / 2, height / 1.12);
    text("Press 'ESC' back to menu", width / 2, height / 1.05);
    pop();

}

//----------------------------------------------

/**
 *  game2 
 */

function drawGame2Levels() {
    background(230);

    let bricksLength = walls.length;
    let redLength = RedBrick.length;
    let greenLength = GreenBrick.length;
    let blueLength = BlueBrick.length;
    let greyLength = greyBrick.length;
    for (let i = 0; i < bricksLength; i++) {
        drawWall(walls[i].posX, walls[i].posY, game2Map.tileSize);
    }

    for (let i = 0; i < redLength; i++) {
        drawColorBlock(RedBrick[i].posX, RedBrick[i].posY, game2Map.tileSize, "red");
    }

    for (let i = 0; i < greenLength; i++) {
        drawColorBlock(GreenBrick[i].posX, GreenBrick[i].posY, game2Map.tileSize, "green");
    }

    for (let i = 0; i < blueLength; i++) {
        drawColorBlock(BlueBrick[i].posX, BlueBrick[i].posY, game2Map.tileSize, "blue");
    }

    for (let i = 0; i < greyLength; i++) {
        drawColorBlock(greyBrick[i].posX, greyBrick[i].posY, game2Map.tileSize, "grey");
    }

    drawColorBlock(goal[0].posX, goal[0].posY, game2Map.tileSize, "flag");

}


function drawColorBlock(x, y, Size, type) {
    switch (type) {

        case "grey":
            //grey
            push();
            noStroke();
            fill(120);
            rect(x, y, Size, Size);
            pop();
            break;

        case "red":
            //red
            push();
            noStroke();
            fill(240, 0, 0);
            rect(x, y, Size, Size);
            pop();
            break;

        case "green":
            //green
            push();
            noStroke();
            fill(0, 240, 0);
            rect(x, y, Size, Size);
            pop();
            break;

        case "blue":
            //blue
            push();
            noStroke();
            fill(0, 0, 240);
            rect(x, y, Size, Size);
            pop();
            break;

        case "flag":
            //goal 
            image(flag, x, y, Size, Size, 0, 0, flag.width, flag.height);

    }

}

function drawGame2Player() {
    push();
    stroke(0);
    strokeWeight(1);
    fill(game2Player.R, game2Player.G, game2Player.B);
    rect(game2Player.playerX, game2Player.playerY, game2Map.tileSize, game2Map.tileSize, 20);
    pop();

}

/**
 * Game2 Collision checking 
 * In this game, player's movement need more accuracy
 * but there will be some collision problem when the map size change 
 */
function game2CanMove(newX, newY) {
    let bricksLength = walls.length;
    let redLength = RedBrick.length;
    let greenLength = GreenBrick.length;
    let blueLength = BlueBrick.length;
    let greyLength = greyBrick.length;

    for (let i = 0; i < bricksLength; i++) {
        let wall = walls[i];
        if (newX < wall.posX + game2Map.tileSize &&
            newX + game2Map.tileSize > wall.posX &&
            newY < wall.posY + game2Map.tileSize &&
            newY + game2Map.tileSize > wall.posY) {
            return false;
        }

    }


    for (let i = 0; i < redLength; i++) {
        let brick = RedBrick[i];
        if (newX < brick.posX + game2Map.tileSize &&
            newX + game2Map.tileSize > brick.posX &&
            newY < brick.posY + game2Map.tileSize &&
            newY + game2Map.tileSize > brick.posY) {
            if (game2Player.R === 240) {
                return true;
            }
            else if (game2Player.R === 120) {
                game2Player.R = 240;
                game2Player.G = 0;
                game2Player.B = 0;
                return false;
            }
            else {

                return false;
            }

        }

    }

    for (let i = 0; i < greenLength; i++) {
        let brick = GreenBrick[i];
        if (newX < brick.posX + game2Map.tileSize &&
            newX + game2Map.tileSize > brick.posX &&
            newY < brick.posY + game2Map.tileSize &&
            newY + game2Map.tileSize > brick.posY) {
            if (game2Player.G === 240) {
                return true;
            }
            else if (game2Player.R === 120) {
                game2Player.R = 0;
                game2Player.G = 240;
                game2Player.B = 0;
                return true;
            }
            else {
                return false;
            }

        }
    }

    for (let i = 0; i < blueLength; i++) {
        let brick = BlueBrick[i];
        if (newX < brick.posX + game2Map.tileSize &&
            newX + game2Map.tileSize > brick.posX &&
            newY < brick.posY + game2Map.tileSize &&
            newY + game2Map.tileSize > brick.posY) {
            if (game2Player.B === 240) {
                return true;
            }
            else if (game2Player.R === 120) {
                game2Player.R = 0;
                game2Player.G = 0;
                game2Player.B = 240;
                return true;
            }
            else {
                return false;
            }

        }
    }

    for (let i = 0; i < greyLength; i++) {
        let brick = greyBrick[i];
        if (newX < brick.posX + game2Map.tileSize &&
            newX + game2Map.tileSize > brick.posX &&
            newY < brick.posY + game2Map.tileSize &&
            newY + game2Map.tileSize > brick.posY) {
            if (!(game2Player.R === 120)) {
                game2Player.R = 120;
                game2Player.G = 120;
                game2Player.B = 120;
                return true;
            }
            else if (game2Player.R === 120) {
                return true;
            }

        }
    }


    let brick = goal[0];
    if (newX < brick.posX + game2Map.tileSize &&
        newX + game2Map.tileSize > brick.posX &&
        newY < brick.posY + game2Map.tileSize &&
        newY + game2Map.tileSize > brick.posY) {

        //debug
        //console.log("reach the flag");
        currentScene = scene.gameOver2;

        return true;
    }

    return true;



}



//gravity
function applyGravity() {
    let newPositionY
    if (!game2Player.isJumping) {
        newPositionY = game2Player.playerY + 0.1;
        if (game2CanMove(game2Player.playerX, newPositionY)) {
            game2Player.velocity += game2Player.gravity;
            game2Player.playerY += game2Player.velocity;
            game2Player.onTheGround = false;
        }
        else {
            game2Player.velocity = 0;
            game2Player.onTheGround = true;
            game2Player.isJumping = false;
            game2Player.playerY = Math.floor(game2Player.playerY / game2Map.tileSize) * game2Map.tileSize;
        }
    }
    else {
        newPositionY = game2Player.playerY + game2Player.velocity;
        if (game2CanMove(game2Player.playerX, newPositionY)) {
            console.log(game2Player.playerY);
            game2Player.velocity += game2Player.gravity;
            game2Player.playerY += game2Player.velocity;
            game2Player.onTheGround = false;
        }
        else {
            game2Player.onTheGround = true;
            game2Player.isJumping = false;
            game2Player.velocity = 0;
        }
    }
}

//game2 game over text 
function drawGame2OverText() {
    background(232, 117, 46);


    if (game2Level === 1) {

        //ending text
        push();
        textSize(100);
        textAlign(CENTER, CENTER);
        textWrap(WORD);
        fill(0, 0, 0);
        text("Congratulations", width / 2 / 2.4, height / 2.7, 800);
        pop();

        //continue text 
        push();
        textSize(35);
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        text("Press 'ENTER' to next level", width / 2, height / 1.6);
        text("Press 'ESC' back to menu", width / 2, height / 1.4);
        pop();
    }
    else if (game2Level === 2) {

        //ending text
        push();
        textSize(100);
        textAlign(CENTER, CENTER);
        textWrap(WORD);
        fill(0, 0, 0);
        text("Congratulations", width / 2 / 2, height / 2.7, 800);
        pop();

        //continue text 
        push();
        textSize(35);
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        text("Press 'ENTER' back to menu", width / 2, height / 1.6);
        pop();
    }

}

//loading levels 
function ReloadLevels() {
    //delete all the map data
    walls = [];
    RedBrick = [];
    GreenBrick = [];
    BlueBrick = [];
    greyBrick = [];
    goal = [];


    switch (game2Level) {
        case 1:
            //load map1 as default
            game2Map.rows = secondGameLevelData.length;
            game2Map.cols = secondGameLevelData[0].length;

            //try to fit the canvas size
            game2Map.tileSize = min(width / game2Map.cols, height / game2Map.rows);

            game2Map.offsetX = (width - game2Map.cols * game2Map.tileSize) / 2;
            game2Map.offsetY = (height - game2Map.rows * game2Map.tileSize) / 2;

            //get all bricks position
            for (let y = 0; y < game2Map.rows; y++) {
                let colLength = secondGameLevelData[y].length;
                for (let x = 0; x < colLength; x++) {
                    let tile = secondGameLevelData[y][x];
                    let posX = x * game2Map.tileSize + game2Map.offsetX;
                    let posY = y * game2Map.tileSize + game2Map.offsetY;
                    if (tile === "#") {
                        // walls 
                        walls.push({ posX, posY });
                    }
                    else if (tile === "1") {
                        game2Player.originX = posX;
                        game2Player.originY = posY;
                        game2Player.playerX = posX;
                        game2Player.playerY = posY;
                    }
                    else if (tile === " ") {
                        continue;
                    }
                    else if (tile === "0") {
                        greyBrick.push({ posX, posY });
                    }
                    else if (tile === "2") {
                        RedBrick.push({ posX, posY });
                    }
                    else if (tile === "3") {
                        GreenBrick.push({ posX, posY });
                    }
                    else if (tile === "4") {
                        BlueBrick.push({ posX, posY });
                    }
                    else if (tile === "5") {
                        goal.push({ posX, posY });
                    }

                }
            }
            break;

        case 2:
            //load map1 as default
            game2Map.rows = secondGameLevelData2.length;
            game2Map.cols = secondGameLevelData2[0].length;

            //try to fit the canvas size
            game2Map.tileSize = min(width / game2Map.cols, height / game2Map.rows);

            game2Map.offsetX = (width - game2Map.cols * game2Map.tileSize) / 2;
            game2Map.offsetY = (height - game2Map.rows * game2Map.tileSize) / 2;

            //get all bricks position
            for (let y = 0; y < game2Map.rows; y++) {
                let colLength = secondGameLevelData2[y].length;
                for (let x = 0; x < colLength; x++) {
                    let tile = secondGameLevelData2[y][x];
                    let posX = x * game2Map.tileSize + game2Map.offsetX;
                    let posY = y * game2Map.tileSize + game2Map.offsetY;
                    if (tile === "#") {
                        // walls 
                        walls.push({ posX, posY });
                    }
                    else if (tile === "1") {
                        game2Player.originX = posX;
                        game2Player.originY = posY;
                        game2Player.playerX = posX;
                        game2Player.playerY = posY;
                    }
                    else if (tile === " ") {
                        continue;
                    }
                    else if (tile === "0") {
                        greyBrick.push({ posX, posY });
                    }
                    else if (tile === "2") {
                        RedBrick.push({ posX, posY });
                    }
                    else if (tile === "3") {
                        GreenBrick.push({ posX, posY });
                    }
                    else if (tile === "4") {
                        BlueBrick.push({ posX, posY });
                    }
                    else if (tile === "5") {
                        goal.push({ posX, posY });
                    }

                }
            }
            break;

    }
}


/**
 * game 3 function 
 */

function drawGame3Level() {
    //background 
    background(224, 204, 150);

    let brickLength = game3bricks.length;
    let mechanismLength = mechanisms.length;
    let doorLength = doors.length;
    let destinationLength = destinations.length;
    for (let i = 0; i < brickLength; i++) {
        drawWall(game3bricks[i].posX, game3bricks[i].posY, game3Map.tileSize);
    }

    for (let i = 0; i < mechanismLength; i++) {
        drawMechanism(mechanisms[i].posX, mechanisms[i].posY, game3Map.tileSize, mechanisms[i].label);
    }

    for (let i = 0; i < doorLength; i++) {
        drawDoor(doors[i].posX, doors[i].posY, game3Map.tileSize, doors[i].label);
    }

    for (let i = 0; i < destinationLength; i++) {
        drawTreasure(destinations[i].posX, destinations[i].posY, treasure);
    }
}

//mechanism
function drawMechanism(x, y, Size, label) {
    push();
    noStroke();
    fill(120);
    rect(x, y, Size, Size);
    pop();

    push();
    noStroke();
    fill(labelsMechanismColor[label]);
    ellipse(x + Size / 2, y + Size / 2, Size / 1.5, Size / 1.5);
    pop();
}

//door
function drawDoor(x, y, Size, label) {
    let tmp = labelsDoorColor[label];
    push();
    noStroke();
    fill(tmp.R, tmp.G, tmp.B, tmp.A);
    rect(x, y, Size, Size);
    pop();
}



//player 1
function drawPlayerOne() {
    push();
    stroke(0);
    strokeWeight(1);
    fill(game3Players.player1Color.R, game3Players.player1Color.G, game3Players.player1Color.B);
    rect(game3Players.player1X, game3Players.player1Y, game3Map.tileSize, game3Map.tileSize, 20);
    pop();
}

//player 2 
function drawPlayerTwo() {
    push();
    stroke(0);
    strokeWeight(1);
    fill(game3Players.player2Color.R, game3Players.player2Color.G, game3Players.player2Color.B);
    rect(game3Players.player2X, game3Players.player2Y, game3Map.tileSize, game3Map.tileSize, 20);
    pop();
}

//Collision (current location)
function game3CollisionCheck(x, y) {

    let gridX;
    let gridY;
    let buffer = 2;


    //calculate the player position in txt(grid)
    gridX = Math.round((x - game3Map.offsetX + buffer) / game3Map.tileSize);
    gridY = Math.round((y - game3Map.offsetY + buffer) / game3Map.tileSize);

    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {

        //check what type of tile 
        let tile = thirdGameLevelData1[gridY][gridX];

        //collide with mechanisms 
        for (let mechanism of mechanisms) {
            if (tile === mechanism.label) {
                return { isCollide: true, label: mechanism.label, type: "mechanism" };
            }
        }

        //collide with doors
        for (let door of doors) {
            let tmpLabel = door.label.toLowerCase();
            if (tile === tmpLabel) {
                return { isCollide: true, label: door.label, type: "door" }
            }
        }

        //collide with destination 
        if (tile === "0") {
            return { isCollide: true, label: null, type: "destination" };
        }


        return { isCollide: false, label: null, type: "empty" };
    } else {

        //console.log("outofBounce");
        return { isCollide: false, label: null, type: "outOfBounds" };
    }
}



/**
 * check player can move or not 
 * only walls and closing door will stop player
 */
function game3CanMove(x, y, direction) {
    let gridX;
    let gridY;
    let buffer = 2;

    //calculate the player position in txt(grid)
    gridX = Math.round((x - game3Map.offsetX + buffer) / game3Map.tileSize);
    gridY = Math.round((y - game3Map.offsetY + buffer) / game3Map.tileSize);

    //debug 
    //console.log("The input direction is:", direction);


    //check type of tile
    let tile = thirdGameLevelData1[gridY][gridX];

    //walls
    if (tile === "#") {
        return false;
    }

    // doors
    for (let door of doors) {
        let tmpLabel = door.label.toLowerCase();
        if (tile === tmpLabel) {
            //debug
            //console.log(door.isOpen)


            if (door.isOpen) {
                //player can move 
                return true;
            }
            else {
                return false;
            }
        }
    }

    return true;
}

function triggerDetection(x, y, playerNumber) {
    let overlap = game3CollisionCheck(x, y);

    //player 1 
    if (playerNumber === 1) {

        if (overlap.type === "mechanism") {

            if (player1ActivedMechanism !== overlap.label) {
                player1ActivedMechanism = overlap.label;

                for (let door of doors) {
                    if (door.label === overlap.label) {
                        door.isOpen = true;
                        //console.log("player1:", door);
                    }
                }
            }
            player1ReachDestination = false;
            player1StandInDoor = null;
        }
        else if (overlap.type === "door") {
            //player 2 away from relevant mechanism
            if (player2ActivedMechanism !== overlap.label) {

                if (player1StandInDoor !== overlap.label) {
                    player1StandInDoor = overlap.label;
                }

                for (let door of doors) {
                    if (door.label === overlap.label) {
                        door.isOpen = true;
                    }
                }
            }
            player1ReachDestination = false;
        }
        else if (overlap.type === "destination") {
            player1ReachDestination = true;
            //console.log(" player1 reach finial");
        }
        else {
            if (player1ActivedMechanism !== null) {
                for (let door of doors) {
                    if (door.label === player1ActivedMechanism) {
                        door.isOpen = false;
                        //console.log("Player1:", door);
                    }
                }
            }
            if (player1StandInDoor !== null) {
                for (let door of doors) {
                    if (door.label === player1StandInDoor) {
                        door.isOpen = false;
                        //console.log("Player1:", door);
                    }
                }
            }
            player1StandInDoor = null;
            player1ActivedMechanism = null;
            player1ReachDestination = false;

        }
    }
    //player 2 
    else if (playerNumber === 2) {
        console.log(overlap);
        if (overlap.type === "mechanism") {

            if (player2ActivedMechanism !== overlap.label) {
                player2ActivedMechanism = overlap.label;

                for (let door of doors) {
                    if (door.label === overlap.label) {
                        door.isOpen = true;
                        //console.log("player2:", door);
                    }
                }
            }
            player2StandInDoor = null;
            player2ReachDestination = false;
        }
        else if (overlap.type === "door") {

            if (player1ActivedMechanism !== overlap.label) {

                if (player2StandInDoor !== overlap.label) {
                    player2StandInDoor = overlap.label;
                }

                for (let door of doors) {
                    if (door.label === overlap.label) {
                        door.isOpen = true;
                    }
                }
            }
            player2ReachDestination = false;
        }
        else if (overlap.type === "destination") {
            player2ReachDestination = true;
            //console.log("player2 reach finial");
        }
        else {
            if (player2ActivedMechanism !== null) {
                for (let door of doors) {
                    if (door.label === player2ActivedMechanism) {
                        door.isOpen = false;
                        //console.log("Player2:", door);
                    }
                }
            }
            if (player2StandInDoor !== null) {
                for (let door of doors) {
                    if (door.label === player2StandInDoor) {
                        door.isOpen = false;
                        //console.log("Player2:", door);
                    }
                }
            }
            player2ReachDestination = false;
            player2StandInDoor = null;
            player2ActivedMechanism = null;

        }
    }
}

//door fading and showing
function doorAnimation() {
    for (let door of doors) {
        if (door.isOpen) {
            labelsDoorColor[door.label].A = constrain(labelsDoorColor[door.label].A, 0, 255);
            labelsDoorColor[door.label].A -= doorAnimationSpeed;
            //console.log("door alpha is:", labelsDoorColor[door.label].A);
        }
        else {
            if (labelsDoorColor[door.label].A < 255) {
                labelsDoorColor[door.label].A += doorAnimationSpeed;
            }
            else {
                labelsDoorColor[door.label].A = 255;
            }
        }
        //console.log("door alpha is:", labelsDoorColor[door.label].A);
    }
}


function drawGame3OverText() {

    background(255, 215, 0);
    switch (game3Level) {
        case 1:
            //ending text
            push();
            textSize(60);
            textAlign(CENTER, CENTER);
            textWrap(WORD);
            fill(0, 0, 0);
            text("You found the treasure together", width / 2 / 2.4, height / 2.7, 800);
            pop();

            //continue text 
            push();
            textSize(35);
            textAlign(CENTER, CENTER);
            fill(0, 0, 0);
            text("Press 'ENTER' to next level", width / 2, height / 1.6);
            text("Press 'ESC' back to menu", width / 2, height / 1.4);
            pop();
            break;

        /**
         * maybe there will be a level2 in the future 
         * 
         *  */
        case 2:
            //ending text
            push();
            textSize(60);
            textAlign(CENTER, CENTER);
            textWrap(WORD);
            fill(0, 0, 0);
            text("You found treasure together", width / 2 / 2.4, height / 2.7, 800);
            pop();

            //continue text 
            push();
            textSize(35);
            textAlign(CENTER, CENTER);
            fill(0, 0, 0);
            text("Press 'ENTER' back to menu", width / 2, height / 1.6);
            pop();
            break;
    }


}

//game over text and statement switch
function GameOver3() {
    if (player1ReachDestination && player2ReachDestination) {
        currentScene = scene.gameOver3;
        drawGame3OverText();
    }
}

//destination 
function drawTreasure(x, y, photo) {
    image(photo, x, y, game3Map.tileSize, game3Map.tileSize, 0, 0, photo.width, photo.height);
}








