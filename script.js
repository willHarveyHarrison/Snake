let count = 0;
let playerSquareX;
let playerSquareY;
let snakeBody = [];
let lastKeyPressed = "ArrowUp";
var startLoop;
let lastMove = '';

// Function to handle keydown event
function handleKeyDown(event) {
    lastKeyPressed = event.key; // Store the key that was pressed
    console.log(lastKeyPressed)
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
    playerSquareX = Math.floor(Math.random() * count);
    playerSquareY = Math.floor(Math.random() * count);
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
        if(!appleSquare.classList.contains('player')){
            appleSquare.classList.add(`apple`);
            availibleSquare = true;
        };
    };
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

    // Wrap around logic for X coordinate (horizontal)
    if (playerSquareX >= count + 1) {
        playerSquareX = 1; // Wrap around to the left side
    }

    // Wrap around logic for Y coordinate (vertical)
    if (playerSquareY >= count + 1) {
        playerSquareY = 1; // Wrap around to the top
    }

    if (playerSquareY < 1) {
        playerSquareY = count; // Wrap around to the bottom
    }

    if (playerSquareX < 1) {
        playerSquareX = count; // Wrap around to the right
    }

    //define the next move
    nextMove = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`)
    if (nextMove.classList.contains('player')){
        endScreen();
    }
    if (nextMove.classList.contains('apple')){
        snakeBodyFunction(nextMove, false);
        appleGen(nextMove);
    } else {
        snakeBodyFunction(nextMove, true);
    }
}

function snakeBodyFunction(nextMove, switchFlag) {
    // Add next move to the snake body
    snakeBody.push(nextMove);
    nextMove.classList.add('player');
    if (switchFlag) {
        let snakeTail = snakeBody.shift();  // Remove from the front (tail)
        snakeTail.classList.remove('player'); // Remove 'player' class from the tail
    }
}

function endScreen() {
    clearInterval(startLoop);
    theEnd()
    console.log('game end');
    setTimeout(function(){
        gameStart();
    }, 100000); // Stops the loop after 3000ms (3 seconds)

}

function theEnd(){










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
    }, 200);

}

gameStart();

// Stop the loop after 3 seconds
