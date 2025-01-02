let count = 0;
let playerSquareX;
let playerSquareY;
let snakeBody = [];
let lastKeyPressed = "ArrowUp";

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
    for (let j = 0; j < count; j++) {
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.classList.add(`x-${i}`, `y-${j}`, `square`);
      container.appendChild(div);
            };
        };
    };
  

function playerGen(){
    playerSquareX = Math.floor(Math.random() * count);
    playerSquareY = Math.floor(Math.random() * count);
    let snakeHead = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`);
    snakeHead.classList.add(`player`);
    snakeBody.push(snakeHead);
};

function appleGen(appleSquare){
    // clear apples
    if(appleSquare){
        appleSquare.classList.remove('apple');
    }
    let availibleSquare = false;
    while(availibleSquare == false){
        let appleSquareX = Math.floor(Math.random() * count);
        let appleSquareY = Math.floor(Math.random() * count);
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
    console.log(lastKeyPressed)
    switch(lastKeyPressed){
        case 'ArrowUp':
            playerSquareY--;
            break;
        case 'ArrowDown':
            playerSquareY++;
            break;
        case 'ArrowLeft':
            playerSquareX--;
            break;
        case 'ArrowRight':
            playerSquareX++;
            break;
    }

    // Wrap around logic for X coordinate (horizontal)
    if (playerSquareX >= count) {
        playerSquareX = 0; // Wrap around to the left side
    }

    // Wrap around logic for Y coordinate (vertical)
    if (playerSquareY >= count) {
        playerSquareY = 0; // Wrap around to the top
    }

    if (playerSquareY < 0) {
        playerSquareY = count - 1; // Wrap around to the bottom
    }

    if (playerSquareX < 0) {
        playerSquareX = count - 1; // Wrap around to the right
    }

    // Remove the 'player' class from the old position
    nextMove = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`)
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
    console.log(switchFlag)
    console.log(snakeBody);
}
  
gridGen();
playerGen();
appleGen();

var gameStart = setInterval(function(){
    // Do your update stuff...
    move(lastKeyPressed);
}, 200);

// Stop the loop after 3 seconds
setTimeout(function(){
    clearInterval(gameStart);
}, 300000); // Stops the loop after 3000ms (3 seconds)