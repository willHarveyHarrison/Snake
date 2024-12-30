let count = 0;
let snakeHead;
let playerSquareX;
let playerSquareY;

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
    snakeHead = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`);
    snakeHead.classList.add(`player`);
};

function appleGen(){
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

function move() {
    // Move the snake to the right by incrementing X
    playerSquareY--;  // Increment X position to move right

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

    // Get the new snake head position based on the updated coordinates
    snakeHead = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`);

    // Remove the 'player' class from the old position
    if (snakeHead) {
        snakeHead.classList.remove('player');
    }

    // Add the 'player' class to the new position (new snake head)
    snakeHead.classList.add('player');

    // Debugging log to check the current class list of the snake head
    console.log(snakeHead.classList[0]);
}

function frameRate(){

};

function snakeLength(){
    // add one to snake length
    // leave one extra square
};


  
gridGen();
playerGen();
appleGen();

var mainLoopId = setInterval(function(){
    // Do your update stuff...
    move();
}, 500);

mainLoopId;
// Stop the loop after 3 seconds
setTimeout(function(){
    clearInterval(mainLoopId);
}, 3000); // Stops the loop after 3000ms (3 seconds)