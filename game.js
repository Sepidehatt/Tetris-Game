
let boardWidth = 10;
let BoardHeight = 20;
let boardSize = boardWidth * BoardHeight;


//figures sides:
let oFigure = [
  [0, 1, boardWidth, boardWidth + 1],
];



let score = document.getElementById('score');
console.log(score);

let boardElm = document.querySelector('.board');


let startBtn = document.querySelector('.start-button');
let intervalId

let board = boardDraw();


let pixelArr = document.querySelectorAll('.board div ');
let groundArr = document.querySelectorAll('.freeze-pixel div');

let currentPosition = 4;
let currentFigure = oFigure[0];


intervalId = setInterval(moveDown, 1000);



function boardDraw() {
  //draw the board with pixel of divs
  for (let i = 0; i < boardSize + boardWidth; i++) {
    if (i < boardSize) {
      let boardPixel = document.createElement('div');
      boardElm.appendChild(boardPixel);
    } else {
      let boardGround = document.createElement('div');
      boardGround.setAttribute('class', 'freeze-pixel board')
      boardElm.appendChild(boardGround);
    }
  }
  return boardElm;
};




function drawFigure() {
  //draw figurs here
  currentFigure.forEach(side => {
    pixelArr[currentPosition + side].setAttribute('class', 'figure')
  })
}


function deleteFigure() {
  //delete draw figurs for prevent Elongation
  currentFigure.forEach(side => {
    pixelArr[currentPosition + side].removeAttribute('class', 'figure')
  })
}



function moveDown() {
  // for moving figures from top to bottom
  deleteFigure();
  currentPosition += boardWidth;
  drawFigure();
  freezePixels();
}

function move(direction) {
  /// to move right and left ,,,but ther is a bug in the adges of board
  deleteFigure();

  let leftEdge = currentFigure.some(side => (currentPosition + side) % boardWidth === 0);
  let rightEdge = currentFigure.some(side => (currentPosition + side) % boardWidth === boardWidth - 1);
  if (direction == "left" && !leftEdge) {
    currentPosition -= 1;
  } if (direction == "left" &&
    currentFigure.some(side => pixelArr[currentPosition + side + boardWidth].classList.contains('freeze-pixel'))) {
    currentPosition += 1;
  } if (direction == "right" && !rightEdge) {
    currentPosition += 1;
  } if (direction == "right" &&
    currentFigure.some(side => pixelArr[currentPosition + side + boardWidth].classList.contains('freeze-pixel'))) {
    currentPosition -= 1;
  }
  drawFigure();
}

function freezePixels() {
  if (currentFigure.some(side => pixelArr[currentPosition + side + boardWidth].classList.contains('freeze-pixel'))) {
    currentFigure.forEach(side => {
      pixelArr[currentPosition + side].setAttribute('class', 'freeze-pixel figure');
    })
    //add a new figure
    currentFigure = oFigure[0];
    currentPosition = 4;
    drawFigure();
  }
}







// move with arrow keys
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "ArrowLeft":
      move("left");
      break;
    case "ArrowRight":
      move("right");
      break;
    case "ArrowDown":
      moveDown()
      break;
  }
})


