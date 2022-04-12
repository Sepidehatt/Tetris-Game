
let boardWidth = 10;
let BoardHeight = 20;
let boardSize = boardWidth * BoardHeight;
let scoreNumber = 0;

let score = document.getElementById('score');
let boardElm = document.querySelector('.board');
let startBtn = document.querySelector('.btn');
let intervalId


let board = boardDraw();
let pixelArr = Array.from(document.querySelectorAll('.board div '));
let groundArr = document.querySelectorAll('.freeze-pixel div');
let gameOverMsg = document.querySelector('header h3')

let startBtnSound = new Audio('./sounds/click.mp3')
let gameMusic = new Audio('./sounds/tetris-gameboy-02.mp3')
gameMusic.volume = 0.1;
gameMusic.loop



//figures sides:
let oFigure = [
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1],
  [0, 1, boardWidth, boardWidth + 1]
];

let iFigure = [
  [0, boardWidth, boardWidth * 2, boardWidth * 3],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3],
  [0, boardWidth, boardWidth * 2, boardWidth * 3],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth + 3]
];

let lFigure = [
  [0, boardWidth, boardWidth * 2, 1],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 2],
  [0, boardWidth, boardWidth * 2, boardWidth * 2 - 1],
  [boardWidth, boardWidth * 2, boardWidth * 2 + 1, boardWidth * 2 + 2]
];

let lMirorFigure = [
  [1, boardWidth + 1, boardWidth * 2, boardWidth * 2 + 1],
  [0, boardWidth, boardWidth + 1, boardWidth + 2],
  [0, 1, boardWidth, boardWidth * 2],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 2]
];

let zFigure = [
  [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
  [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1],
  [0, boardWidth, boardWidth + 1, boardWidth * 2 + 1],
  [boardWidth + 1, boardWidth + 2, boardWidth * 2, boardWidth * 2 + 1]
];

let zMirorFigure = [
  [1, boardWidth, boardWidth + 1, boardWidth * 2],
  [0, 1, boardWidth+1, boardWidth + 2],
  [1, boardWidth, boardWidth + 1, boardWidth * 2],
  [0, 1, boardWidth+1, boardWidth + 2]
];

let tFigure = [
  [0, boardWidth - 1, boardWidth, boardWidth + 1],
  [0, boardWidth, boardWidth + 1, boardWidth * 2],
  [boardWidth, boardWidth + 1, boardWidth + 2, boardWidth * 2 + 1],
  [0, boardWidth - 1, boardWidth, boardWidth * 2]
]

let figuresArr = [oFigure, iFigure, lFigure, zFigure, tFigure,lMirorFigure,zMirorFigure]

let randomNum = Math.floor(Math.random() * figuresArr.length)
let currentPosition = 4;
let currentRotation = 0;
let currentFigure = figuresArr[randomNum][currentRotation];







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
    pixelArr[currentPosition + side].classList.add("figure")
  })
}


function deleteFigure() {
  //delete draw figurs for prevent Elongation
  currentFigure.forEach(side => {
    pixelArr[currentPosition + side].classList.remove('figure')
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





//rotate figures
function rotate() {
  // when the figures rotated near board edges,, buges apear
  deleteFigure();
  currentRotation += 1
  if (currentRotation === 4) {
    currentRotation = 0;
  }
  currentFigure = figuresArr[randomNum][currentRotation];
  drawFigure();
}




function freezePixels() {
  if (currentFigure.some(side => pixelArr[currentPosition + side + boardWidth].classList.contains('freeze-pixel'))) {
    currentFigure.forEach(side => {
      pixelArr[currentPosition + side].classList.add('freeze-pixel');
      pixelArr[currentPosition + side].classList.add('figure');
    })
    //add a new figure
    randomNum = Math.floor(Math.random() * figuresArr.length)
    currentFigure = figuresArr[randomNum][currentRotation];
    currentPosition = 4;

    drawFigure();
    increaseScore();
    gameOver();
  }
}


//to increase the score,,when a line filled of figures
function increaseScore() {

  for (let i = 0; i < boardSize; i += boardWidth) {
    let filledLineArr = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 7, i + 8, i + 9];
    if (filledLineArr.every(pixel => pixelArr[pixel].classList.contains('freeze-pixel'))) {

      scoreNumber += 10;
      score.innerText = scoreNumber;
      filledLineArr.forEach(pixel => {

        pixelArr[pixel].classList.remove('figure')
        pixelArr[pixel].classList.remove('freeze-pixel')
      });


      const pixelRemoved = pixelArr.splice(i, boardWidth);
      pixelArr = pixelRemoved.concat(pixelArr);
      pixelArr.forEach(pixel => boardElm.appendChild(pixel));

    }
  }
}



function gameOver() {
  if (currentFigure.some(pixel => pixelArr[pixel + currentPosition].classList.contains('freeze-pixel'))) {
    clearInterval(intervalId)
    gameOverMsg.innerText = 'you lost dude! accept it!'
    gameMusic.pause()

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
    case "ArrowUp":
      rotate()
      break;
  }
})


//start button
startBtn.addEventListener('click', () => {
  startBtnSound.play()
  intervalId = setInterval(moveDown, 1000);
  gameMusic.play()
})