let count = 0;

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
    let playerSquareX = Math.floor(Math.random() * count);
    let playerSquareY = Math.floor(Math.random() * count);
    let startSquare = document.querySelector(`.x-${playerSquareX}.y-${playerSquareY}`);
    startSquare.classList.add(`player`);
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

function movment(){

};

function frameRate(){

};
  
  
gridGen();
playerGen();
appleGen();