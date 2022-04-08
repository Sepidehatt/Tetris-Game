
 let boardWidth = 10;
 let BoardHeight =20;
 let boardSize = boardWidth * BoardHeight;

 let oFigure = [[0,1,boardWidth,boardWidth+1]];



let boardElm = document.querySelector('.board');
let groundElm = document.querySelector('.freeze-pixel');

let startBtn = document.querySelector('.start-button');
let intervalId

let board = boardDraw();
let ground = groundDraw();

let pixelArr = document.querySelectorAll('.board div');
let groundArr= document.querySelectorAll('.freeze-pixel div');

let currentPosition = 4;
let currentFigure = oFigure[0];


intervalId=setInterval(moveDown,1000);



function boardDraw(){
  //draw the board with pixel of divs
  for(let i =0 ; i<boardSize ; i++){
    let boardPixel=document.createElement('div');
    boardElm.appendChild(boardPixel);
  }
  return boardElm;
};


function groundDraw(){
  //create a ground with class to  check,,if figurs touch the ground they freezed
  for(let i = boardSize-boardWidth ; i <boardSize ; i++){
    let boardGround=document.createElement('div');
    boardGround.classList.add('freeze-pixel');
    groundElm.appendChild(boardGround);
  }
  return groundElm;
};



function drawFigure(){
  //draw figurs here
  currentFigure.forEach(index=>{  
    pixelArr[currentPosition+index].classList.add('figure');
  })
}


function deleteFigure(){
  //delete draw figurs for prevent Elongation
  currentFigure.forEach(index=>{  
    pixelArr[currentPosition+index].classList.remove('figure');
  })
}


function moveDown(){
  // for moving figures from top to bottom
  deleteFigure();
  currentPosition += boardWidth;
  drawFigure();
}


