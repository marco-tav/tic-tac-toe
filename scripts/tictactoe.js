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

function updateDOMBoard(cell, marker) {
  cell.innerText = marker;
}


function removeOldGrid() {
  const oldGrid = document.querySelector('.game-grid');

  oldGrid.remove(); 
}


const game = (function(player1Name = "Player 1", player2Name = "Player 2") {
  if(document.querySelector('.game-grid')) {
    removeOldGrid();
  }
  
  const gameBoard = makeGameBoard();
  const gridContainer = document.querySelector('.grid-container');

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
  
    return gameGrid;
  })(gridContainer);
  
  const status = (function() {
    let n = 1; // round number
    let gameOngoing = true;
    let gameTied = false;
    let winner;

    const increaseN = () => n++;
    const getN = () => n;

    function updateOngoing() {
      gameOngoing = false;
    }

    function getOngoing() {
      return gameOngoing;
    }

    function updateTiedStatus() {
      gameTied = true;
    }

    function getTiedStatus() {
      return gameTied;
    }

    function setWinner(playerName) {
      winner = playerName;
    }

    const getWinner = () => winner;

    return {increaseN, getN, updateOngoing, getOngoing, updateTiedStatus, getTiedStatus, setWinner, getWinner}
  })();

  const playerArr = [makePlayer(player1Name, "x"), makePlayer(player2Name, "o")];

  let activePlayer = selectRandomPlayer(playerArr);

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

  function playRound(e) {
    const [x, y] = getCoordinates(e.target);
  
    gameBoard.placeMarker(x, y, activePlayer.getPlayerMarker());
  
    updateDOMBoard(e.target, activePlayer.getPlayerMarker());
  
    const rowStr = gameBoard.getRowString(x);
    const colStr = gameBoard.getColString(y);
    const [mainDiag, secondaryDiag] = gameBoard.getDiagonalsArr();
  
    const win = checkWin(rowStr, colStr, mainDiag, secondaryDiag, activePlayer.getPlayerMarker());
    
    
    if(win) {
      removeListenersOnGameEnd();
    }
    
    switchActivePlayer();
  }

  return {gameBoard, playerArr, getActivePlayer};
});



const startBtn = document.querySelector('button');

startBtn.addEventListener('click', game);