document.querySelector('.js-player-turn').innerHTML = 'Player X play!';

let html = `
<div class="row-container row-con">
     <div class="js-cell"></div>
      <div class="js-cell"></div>
      <div class="js-cell"></div>
    </div>
    <div class="row-container row-con1">
      <div class="js-cell"></div>
      <div class="js-cell"></div>
      <div class="js-cell"></div>
    </div>
    <div class="row-container row-con2">
      <div class="js-cell"></div>
      <div class="js-cell"></div>
      <div class="js-cell"></div>
    </div>  
    <p class="display-winner js-display-winner"></p>
    <p class="start js-start">Start</p>
    <div class="restart">
      <button class="js-restart-button">Restart</button>
    </div>
`
document.querySelector('.js-game-container').innerHTML = html;

let gameMoves = '';
const playerMove1 = 'X';
const playerMove2 = 'O'; 
let content0;
let content1;
let content2;
let content3;
let content4;
let content5;
let content6;
let content7;
let content8;
let checkStatus = 0;
let isWinner = false;

function gamePlay () {
  if (gameMoves === '') {
    gameMoves = playerMove1;
    document.querySelector('.js-player-turn').innerHTML = 'Player O turn';
  } else
  if (gameMoves === playerMove1){
    gameMoves = playerMove2;
    document.querySelector('.js-player-turn').innerHTML = 'Player X turn';
  } else
  if (gameMoves === playerMove2) {
    gameMoves = playerMove1;
    document.querySelector('.js-player-turn').innerHTML = 'Player O turn';
    }
}


document.querySelectorAll('.js-cell').forEach((eachCell) => {
  eachCell.addEventListener('click', handleClicks);
});

function handleClicks (event) {
  document.querySelector('.js-start').style.visibility = 'hidden';
  checkStatus++
  cell = event.target;

  
 
  gamePlay();
    cell.innerHTML = gameMoves;
    let index = Array.from(document.querySelectorAll('.js-cell')).indexOf(cell);
    
    if(index === 0) content0 = cell.textContent;
    if(index === 1) content1 = cell.textContent;
    if(index === 2) content2 = cell.textContent;
    if(index === 3) content3 = cell.textContent;
    if(index === 4) content4 = cell.textContent;
    if(index === 5) content5 = cell.textContent;
    if(index === 6) content6 = cell.textContent;
    if(index === 7) content7 = cell.textContent;
    if(index === 8) content8 = cell.textContent;
  
    checkWinner(stopClicking);

    cell.removeEventListener('click', handleClicks);

    if (isWinner === false && checkStatus === 9) {
      document.querySelector('.js-player-turn').innerHTML = 'No winner';
      document.querySelector('.js-display-winner').innerHTML = 'Tie';
    }
}

function checkWinner(stop) {
  if (content0 && content1 && content2 && content0 === content1 && content1 === content2) {
    document.querySelector('.js-display-winner').innerHTML = `${content0} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content3 && content4 && content5 && content3 === content4 && content4 === content5) {
    document.querySelector('.js-display-winner').innerHTML = `${content3} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content6 && content7 && content8 && content6 === content7 && content7 === content8) {
    document.querySelector('.js-display-winner').innerHTML = `${content6} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content0 && content3 && content6 && content0 === content3 && content3 === content6) {
    document.querySelector('.js-display-winner').innerHTML = `${content0} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content1 && content4 && content7 && content1 === content4 && content4 === content7) {
    document.querySelector('.js-display-winner').innerHTML = `${content1} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content2 && content5 && content8 && content2 === content5 && content5 === content8) {
    document.querySelector('.js-display-winner').innerHTML = `${content2} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content0 && content4 && content8 && content0 === content4 && content4 === content8) {
    document.querySelector('.js-display-winner').innerHTML = `${content0} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
  if (content2 && content4 && content6 && content2 === content4 && content4 === content6) {
    document.querySelector('.js-display-winner').innerHTML = `${content2} wins`;
    document.querySelector('.js-player-turn').innerHTML = 'Game Over';
    isWinner = true;
    stop();
  }
}

function stopClicking () {
  document.querySelectorAll('.js-cell').forEach((stopClick) => {
    stopClick.removeEventListener('click', handleClicks);
  });
}

document.querySelector('.js-restart-button').addEventListener('click', () => {
 location.reload();
});




