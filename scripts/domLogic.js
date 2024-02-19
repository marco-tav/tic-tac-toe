import playRoundWrapper from "./playRound.js";

// grid()
// removeOldGrid()
// updateDOMBoard()
// updateMessage()
// removeListenersOnGameEnd()

function grid(container, gameBoard, activePlayer, roundNumber, playerArr, message, messageBoard) {
  const gameGrid = document.createElement('div');
  gameGrid.setAttribute('class', 'game-grid');

  for (let i=0; i < 3; i++) {
    for (let j=0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-row', `${i}`);
      cell.setAttribute('data-col', `${j}`);

      const playRound = playRoundWrapper(gameBoard, activePlayer, roundNumber, playerArr, message, messageBoard);
      
      cell.addEventListener('click', playRound, {once: true});

      gameGrid.appendChild(cell);
    }
  }

  container.appendChild(gameGrid);
}

function updateDOMBoard(cell, marker) {
  cell.innerText = marker;
}

function removeOldGrid() {
  const oldGrid = document.querySelector('.game-grid');

  oldGrid.remove(); 
}

function updateMessage(message, messageBoard) {
  messageBoard.innerText = message;
};

function removeListenersOnGameEnd() {
  let cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    cell.removeEventListener('click', playRound);
  })
}

export {updateDOMBoard, removeOldGrid, grid, updateMessage, removeListenersOnGameEnd};