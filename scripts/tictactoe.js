// This functions creates the array that represents the board logically
function makeGameBoard() {
  const board = [];

  for(let i=0; i < 3; i++) {
    board[i] = [];
    for(let j=0; j < 3; j++) {
      board[i].push(makeCell());
    }
  }

  function placeMarker(row, col, playerMarker) {
    board[row][col].changeValue(playerMarker);
  }

  function getRowString(row) {
    let rowString = "";
    for(let i = 0; i < 3; i++) {
      rowString += board[row][i].getValue();
    }

    return rowString;
  }

  function getColString(col) {
    let colString = "";
    for(let i=0; i < 3; i++) {
      colString += board[i][col].getValue();
    }

    return colString;
  }

  function getDiagonalsArr() {
    let mainDiagonal = "";
    let secondaryDiagonal = "";

    for (let i = 0; i < 3; i++) {
      mainDiagonal += board[i][i].getValue();
    }

    for (let j = 0; j < 3; j++) {
      secondaryDiagonal += board[2-j][j].getValue();
    }

    return [mainDiagonal, secondaryDiagonal];
  }

  return {placeMarker, getRowString, getColString, getDiagonalsArr}
}

// This functions represents each cell on the board.
function makeCell() {
  let value = "";

  function changeValue(playerMarker) {
    value = playerMarker;
  }

  function getValue() {
    return value;
  }

  return {changeValue, getValue};
}

// Functions that creates players
function makePlayer(name, marker) {
  const playerName = name;
  const playerMarker = marker;

  const getPlayerName = function() {
    return playerName;
  }

  const getPlayerMarker = function() {
    return playerMarker;
  }

  return {getPlayerName, getPlayerMarker}
}

// This functions updates the grapgical board on the DOM when a click happens.
function updateDOMBoard(cell, marker) {
  cell.innerText = marker;
}

// This functions removes a pre-existing grid when necessary.
function removeOldGrid() {
  const oldGrid = document.querySelector('.game-grid');

  oldGrid.remove(); 
}

// Main function that controls the flow of the game.
const game = (function(player1Name = "Player 1", player2Name = "Player 2") {
  if(document.querySelector('.game-grid')) {
    removeOldGrid();
  }
  
  const gameBoard = makeGameBoard();
  const gridContainer = document.querySelector('.grid-container');
  const messageBoard = document.querySelector('.message-box>h2');
  let message;
  let roundNumber = 1;

  const grid = (function(container) {
    const gameGrid = document.createElement('div');
    gameGrid.setAttribute('class', 'game-grid');
  
    for (let i=0; i < 3; i++) {
      for (let j=0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('data-row', `${i}`);
        cell.setAttribute('data-col', `${j}`);
        
        cell.addEventListener('click', playRound, {once: true});

        gameGrid.appendChild(cell);
      }
    }

    container.appendChild(gameGrid);
  })(gridContainer);

  const playerArr = [makePlayer(player1Name, "x"), makePlayer(player2Name, "o")];

  let activePlayer = selectRandomPlayer(playerArr);

  message = `${activePlayer.getPlayerName()}'s turn`;
  updateMessage(message, messageBoard);

  function getActivePlayer() {
    return activePlayer;
  }

  function selectRandomPlayer() {
    let random = Math.floor(Math.random()*2);

    return playerArr[random];
  }

  function switchActivePlayer() {
    activePlayer = activePlayer.getPlayerName() === playerArr[0].getPlayerName() ? playerArr[1] : playerArr[0];
  }

  function getCoordinates(cell) {
    let row = cell.getAttribute('data-row');
    let col = cell.getAttribute('data-col');
  
    return [row, col]
  }

  function checkWin(rowStr, colStr, mainDiagStr, secDiagStr, marker) {
    let win = false;

  
    let rowWin = rowStr === `${marker}${marker}${marker}`;
    let colWin = colStr === `${marker}${marker}${marker}`;
    let mainDiagWin = mainDiagStr === `${marker}${marker}${marker}`;
    let secondaryDiagWin = secDiagStr === `${marker}${marker}${marker}`;
  
    if(rowWin || colWin || mainDiagWin || secondaryDiagWin) {
      win = true;
    }
  
    return win;
  }
  
  function removeListenersOnGameEnd() {
    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
      cell.removeEventListener('click', playRound);
    })
  }

  function updateMessage(message, messageBoard) {
    messageBoard.innerText = message;
  };

  function playRound(e) {
    const [x, y] = getCoordinates(e.target);
  
    gameBoard.placeMarker(x, y, activePlayer.getPlayerMarker());
  
    updateDOMBoard(e.target, activePlayer.getPlayerMarker());
  
    const rowStr = gameBoard.getRowString(x);
    const colStr = gameBoard.getColString(y);
    const [mainDiag, secondaryDiag] = gameBoard.getDiagonalsArr();
    const win = checkWin(rowStr, colStr, mainDiag, secondaryDiag, activePlayer.getPlayerMarker());
    
    // Here starts the logic that checks for game end conditions
    if(roundNumber > 4) { // can't win before round 5 as no one placed 3 markers yet.      
      if(win) {
        removeListenersOnGameEnd();
        
        message = `${activePlayer.getPlayerName()} won!`;
        updateMessage(message, messageBoard);

      } else if (roundNumber === 9 && !win) {
        message = "it's a tie!";
        updateMessage(message, messageBoard);
      }
    }
    
    switchActivePlayer();
    roundNumber++;

    if(!win && message !== "it's a tie!") {
      message = `${activePlayer.getPlayerName()}'s turn`;
      updateMessage(message, messageBoard);
    } 
  }

  return {gameBoard, playerArr, getActivePlayer};
});

// Function that starts the game when start button is clicked
const startGame = (function() {
  const startBtn = document.querySelector('button');
  const p1name = document.getElementById('p1name');
  const p2name = document.getElementById('p2name');

  const oldNames = {p1OldName: "", p2OldName: ""};  

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();

    game(p1name.value, p2name.value);

    oldNames.p1OldName = p1name.value;
    oldNames.p2OldName = p2name.value;

    p1name.value = "";
    p2name.value = "";
  });

  function getOldP1() {
    return oldNames.p1OldName;
  }

  function getOldP2() {
    return oldNames.p2OldName;
  }

  return {getOldP1, getOldP2};
})();

// Function that restarts the game using the same player names when restart clicked
const restartGame = (function() {
  const restartBtn = document.getElementById('restart');
  
  restartBtn.addEventListener('click', (e) => {
    e.preventDefault();

    game(startGame.getOldP1(), startGame.getOldP2());
  })
})(startGame.getOldP1(), startGame.getOldP2());