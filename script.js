let count = 0;
let playerSquareX;
let playerSquareY;
let snakeBody = [];
let lastKeyPressed = "ArrowUp";
var startLoop;
let lastMove = '';
let growth = 0;
let appleCounter = Math.floor(Math.random() * 10);

// Function to handle keydown event
function handleKeyDown(event) {
    lastKeyPressed = event.key; // Store the key that was pressed
}

// Attach event listener for the 'keydown' event
window.addEventListener('keydown', handleKeyDown);

function gridGen() {
    const size = document.getElementById('size');
    const container = document.getElementById('container');
    count = parseInt(size.value);
    const gridSize = parseInt(size.value); // Get the grid size
  
    // Set the class style of the container
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
    // Clear existing divs
    container.innerHTML = '';
    for (let j = count ; j > 0; j--) {
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.classList.add(`x-${i+1}`, `y-${j}`, `square`);
      container.appendChild(div);
            };
        };
    };
  

function playerGen(){
    playerSquareX = Math.floor(Math.random() * count + 1);
    playerSquareY = Math.floor(Math.random() * count + 1);
    let snakeHead = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`);
    snakeHead.classList.add(`player`);
    snakeBody = [snakeHead];
};

function appleGen(appleSquare){
    // clear apples
    if(appleSquare){
        appleSquare.classList.remove('apple');
    }
    let availibleSquare = false;
    while(availibleSquare == false){
        let appleSquareX = Math.floor(Math.random() * count + 1);
        let appleSquareY = Math.floor(Math.random() * count + 1);
        let appleSquare = document.querySelector(`.x-${appleSquareX}.y-${appleSquareY}`);
        //script to not spawn on player
        if(!appleSquare.classList.contains('player') && !appleSquare.classList.contains('goldenApple')){
            appleSquare.classList.add(`apple`);
            
            availibleSquare = true;
        };
    };
};

function goldenAppleGen(appleSquare){
    appleCounter ++;
    if (appleCounter == 20){
        appleSquare = document.querySelector('.goldenApple');
        if(appleSquare){
            appleSquare.classList.remove('goldenApple');
        }
    }
    if (appleCounter == 80){
        let availibleSquare = false;
        while(availibleSquare == false){
            let appleSquareX = Math.floor(Math.random() * count + 1);
            let appleSquareY = Math.floor(Math.random() * count + 1);
            let appleSquare = document.querySelector(`.x-${appleSquareX}.y-${appleSquareY}`);
            //script to not spawn on player
            if(!appleSquare.classList.contains('player') && !appleSquare.classList.contains('apple')){
                appleSquare.classList.add(`goldenApple`);
                availibleSquare = true;
            };
        };
        appleCounter = Math.floor(Math.random() * 10);
    }
};

function move(lastKeyPressed) {
    // Move the snake to the right by incrementing X
      // Increment X position to move right

    if(lastKeyPressed == 'ArrowUp' && lastMove != 'down'){
        lastMove = 'up'
    } else if(lastKeyPressed == 'ArrowDown' && lastMove != 'up'){
        lastMove = 'down'
    }  else if(lastKeyPressed == 'ArrowLeft' && lastMove != 'right'){
        lastMove = 'left'
    }  else if(lastKeyPressed == 'ArrowRight' && lastMove != 'left'){
        lastMove = 'right'
    } 

    switch(lastMove){
        case 'up':
            playerSquareY++;
            break;
        case 'down':
            playerSquareY--;
            break;
        case 'left':
            playerSquareX--;
            break;
        case 'right':
            playerSquareX++;
            break;
    }

    handleBorders()

    //handle next move
    nextMove = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`)

    handlecollisions(nextMove)
}

function handleBorders(){
    // Wrap around logic for X coordinate (horizontal)
    if (playerSquareX >= count + 1) {
        return playerSquareX = 1; // Wrap around to the left side
    }

    // Wrap around logic for Y coordinate (vertical)
    if (playerSquareY >= count + 1) {
        return playerSquareY = 1; // Wrap around to the top
    }

    if (playerSquareY < 1) {
        return playerSquareY = count; // Wrap around to the bottom
    }

    if (playerSquareX < 1) {
        return playerSquareX = count; // Wrap around to the right
    }
}

function handlecollisions(){
    //handle self collision
    if (nextMove.classList.contains('player')){
        endScreen();
    }
    //handle apple and growth
    if (nextMove.classList.contains('apple')){
        growth ++
        appleGen(nextMove);
    } else if(nextMove.classList.contains('goldenApple')){
        growth += 3;
        let goldenApple = document.getElementsByClassName('goldenApple')[0];
        goldenApple.classList.remove('goldenApple');
        goldenAppleGen(nextMove);
    }
    //empty space move
    snakeBodyFunction(nextMove);
}

function snakeBodyFunction(nextMove) {
    // Add next move to the snake body
    snakeBody.push(nextMove);
    nextMove.classList.add('player');
    if (growth > 0) {
        growth--
        return
    } else {
        let snakeTail = snakeBody.shift();  // Remove from the front (tail)
        snakeTail.classList.remove('player'); // Remove 'player' class from the tail
    }
}

function endScreen() {
    clearInterval(startLoop);
    theEnd()
    setTimeout(function(){
        gameStart();
    }, 4000); // Stops the loop after 3000ms (3 seconds)
}

function theEnd(){
    // Clear the grid
    document.querySelectorAll('.player').forEach(cell => {
        cell.classList.remove('player');
    });

    document.querySelectorAll('.apple').forEach(cell => {
        cell.classList.remove('apple');
    });

    // Coordinates for "GAME"
    const G = [
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
        [0, 3],                             
        [0, 2],           [2, 2], [3, 2],  [4, 2],
        [0, 1],                             [4, 1],
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
    ];
    for (const [x, y] of G) {
        drawCell(2, 18, x, y, 'black'); // Adjust the starting position for "G"
    }

    const A = [
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
        [0, 3],                             [4, 3],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
        [0, 1],                             [4, 1],
        [0, 0],                             [4, 0]
    ];
    for (const [x, y] of A) {
        drawCell(8, 18, x, y, 'black'); // Adjust the starting position for "A"
    }

    const M = [
        [0, 4],                           [4, 4],
        [0, 3],[1,3],             [3, 3], [4, 3],
        [0, 2],        [2, 2],            [4, 2],
        [0, 1],                           [4, 1],
        [0, 0],                           [4, 0]
    ];
    for (const [x, y] of M) {
        drawCell(14, 18, x, y, 'black'); // Adjust the starting position for "M"
    }

    const E = [
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
        [0, 3],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
        [0, 1],
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
    ];
    for (const [x, y] of E) {
        drawCell(20, 18, x, y, 'black'); // Adjust the starting position for "E"
    }

    const O = [
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
        [0, 3],                             [4, 3],
        [0, 2],                             [4, 2],
        [0, 1],                             [4, 1], 
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
    ];
    for (const [x, y] of O) {
        drawCell(2,10,x, y, 'black');
    }
    const V = [
        [0, 4],                         [4, 4],
        [0, 3], [1, 2],          [3, 2], [4, 3],
        [0, 2], [1, 1],          [3, 1],[4, 2],
                        [2, 1],
                        [2, 0],         
    ]; 
    for (const [x, y] of V) {
        drawCell(8,10,x, y, 'black');
    }
    const E2 = [
        [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
        [0, 3],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
        [0, 1],
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]
    ];
    for (const [x, y] of E2) {
        drawCell(14,10,x, y, 'black');
    }

    const R = [
        [0, 4], [1, 4], [2, 4], [3, 4], 
        [0, 3],                               [4, 3],
        [0, 2], [1, 2], [2, 2], [3, 2], 
        [0, 1],                   [3, 1],
        [0, 0],                           [4, 0]
    ];
    for (const [x, y] of R) {
        drawCell(20,10 ,x, y, 'black');
    }
}

function drawCell(row, col, x, y, color) {
    const cell = document.querySelector(`.x-${x+row}.y-${y+col}`);
    if (cell) {
        cell.style.backgroundColor = color;
    }
}

function gameStart(){
    gridGen();
    playerGen();
    appleGen();

    startLoop = setInterval(function(){
        // Do your update stuff...
        move(lastKeyPressed);
        goldenAppleGen();
    }, 200);

}

gameStart();

// Stop the loop after 3 seconds
