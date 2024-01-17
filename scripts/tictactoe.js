function makeGameBoard() {
  const board = [];

  for(let i=0; i < 3; i++) {
    board[i] = [];
    for(let j=0; j < 3; j++) {
      board[i].push(makeCell());
    }
  }

  function placeMarker(row, col, playerMarker) {
    if(board[row][col].wasChanged()) {
      console.log("You can't overwrite another player's marker");
    } else {
      board[row][col].changeValue(playerMarker);
    }
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
  let markerPlaced = false;

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

function makeGrid() {
  const gameGrid = document.createElement('div');
  gameGrid.setAttribute('class', 'game-grid');
  console.log(gameGrid);

  for (let i=0; i < 3; i++) {
    for (let j=0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-row', `${i}`);
      cell.setAttribute('data-col', `${j}`);
      gameGrid.appendChild(cell);
    }
  }

  return gameGrid;
}


const game = (function(player1Name = "Player 1", player2Name = "Player 2") {
  const gameBoard = makeGameBoard();
  
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

  const player1 = makePlayer(player1Name, "x");
  const player2 = makePlayer(player2Name, "o");

  const playerArr = [player1, player2];

  function selectRandomPlayer(arr) {
    let random = Math.floor(Math.random()*2);

    return playerArr[random];
  }

  function switchActivePlayer() {
    activePlayer = activePlayer.getPlayerName() === playerArr[0].getPlayerName() ? playerArr[1] : playerArr[0];
  }

  function getCoordinates() {
    let row = prompt("Enter the row: ");
    let col = prompt("Enter the column: ");
  
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

  let activePlayer = selectRandomPlayer(playerArr);

  const getActivePlayer = () => activePlayer;

  console.log("GAME STARTS");

  while(status.getOngoing() && status.getN()<10) {
    console.log(`${activePlayer.getPlayerName()}'s turn`);

    const [x, y] = getCoordinates();

    gameBoard.placeMarker(x, y, activePlayer.getPlayerMarker());
    // gameBoard.printBoard(); No longer needed in DOM version

    if (status.getN() > 4) { // Here we check for a win
      let row = gameBoard.getRowString(x);
      let col = gameBoard.getColString(y);
      let [mainDiag, secondaryDiag] = gameBoard.getDiagonalsArr();
      let win = checkWin(row, col, mainDiag, secondaryDiag, activePlayer.getPlayerMarker());

      if(win) {
        status.updateOngoing();
        status.setWinner(activePlayer.getPlayerName());
      } else if (!win && status.getN() === 9) {
        status.updateOngoing();
        status.updateTiedStatus();
      }
    }

    status.increaseN();
    switchActivePlayer();
  }

  if(status.getTiedStatus()) {
    console.log("It's a tie!");
  } else {
    console.log(`The winner is ${status.getWinner()}`);
  }

  return {gameBoard, playerArr, getActivePlayer};
});