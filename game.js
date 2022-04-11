
let boardWidth = 10;
let BoardHeight = 20;
let boardSize = boardWidth * BoardHeight;
let scoreNumber = 0;

let score = document.getElementById('score');
let boardElm = document.querySelector('.board');
let startBtn = document.querySelector('.start-button');
let intervalId

let board = boardDraw();
let pixelArr = document.querySelectorAll('.board div ');
let groundArr = document.querySelectorAll('.freeze-pixel div');




//figures sides:
let oFigure = [
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1]
];

let iFigure = [
  [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 3 + 1],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3],
  [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 3 + 1],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3]
];

let lFigure = [
  [1, boardWidth + 1, boardWidth * 2 + 1, 2],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 2],
  [1, boardWidth + 1, boardWidth * 2 + 1, boardWidth * 2],
  [boardWidth, boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2]
];

let zFigure = [
  [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
  [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1],
  [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
  [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1]
];

let tFigure = [
  [1, boardWidth, boardWidth + 1, boardWidth + 2],
  [1, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 1],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 1],
  [1, boardWidth, boardWidth + 1, boardWidth * 2 + 1]
]

let figuresArr = [oFigure, iFigure, lFigure, zFigure]

let randomNum = Math.floor(Math.random()*figuresArr.length)
let currentPosition = 3;
let currentFigure = figuresArr[randomNum][1];
console.log(figuresArr[randomNum][1]);






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
    currentFigure.some(side => pixelArr[currentPosition + side].classList.contains('freeze-pixel'))) {
    currentPosition += 1;
  } if (direction == "right" && !rightEdge) {
    currentPosition += 1;
  } if (direction == "right" &&
    currentFigure.some(side => pixelArr[currentPosition + side].classList.contains('freeze-pixel'))) {
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
    randomNum = Math.floor(Math.random()*figuresArr.length)
    currentFigure = figuresArr[randomNum][1];
    currentPosition = 4;
    drawFigure();
    increaseScore();
  }
}



function increaseScore() {
  // a problem here: when a line remove, the empty spaces remains
  for (let i = 0; i < boardSize; i += boardWidth) {
    let filledLineArr = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 7, i + 8, i + 9];
    if (filledLineArr.every(pixel => pixelArr[pixel].classList.contains('freeze-pixel'))) {
      scoreNumber += 10;
      score.innerText = scoreNumber;
      filledLineArr.forEach(pixel => {
        pixelArr[pixel].removeAttribute('class', 'figure');
      })
    }
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


startBtn.addEventListener('click',()=>{
  intervalId = setInterval(moveDown, 1000);
})