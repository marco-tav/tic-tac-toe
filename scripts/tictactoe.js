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

  function printBoard() {
    for(let i=0; i < 3; i++){
      let row = `Row ${i}: `;
      for(let j=0; j < 3; j++) {
        row += " " + board[i][j].getValue();
      }
      console.log(row);
    }
    console.log(" ");
  }

  return {placeMarker, printBoard, getRowString, getColString, getDiagonalsArr}
}


function makeCell() {
  let value = "*";
  let markerPlaced = false;

  function changeValue(playerMarker) {
    value = playerMarker;
    markerPlaced = true;
  }

  function getValue() {
    return value;
  }

  function wasChanged() {
    return markerPlaced;
  }

  return {changeValue, getValue, wasChanged};
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

  const player1 = makePlayer(player1Name, "X");
  const player2 = makePlayer(player2Name, "O");

  const playerArr = [player1, player2];

  function selectRandomPlayer() {
    let random = Math.floor(Math.random()*2);

    return playerArr[random];
  }

  function switchActivePlayer() {
    activePlayer = activePlayer.getPlayerName() === "Player 1" ? activePlayer = playerArr[1] : activePlayer = playerArr[0];
  }

  function getCoordinates() {
    let row = prompt("Enter the row: ");
    let col = prompt("Enter the column: ");
  
    return [row, col]
  }

  let activePlayer = selectRandomPlayer();

  console.log("GAME STARTS");

  while(status.getOngoing() && status.getN()<10) {
    console.log(`${activePlayer.getPlayerName()}'s turn`);

    const [x, y] = getCoordinates();

    gameBoard.placeMarker(x, y, activePlayer.getPlayerMarker());
    gameBoard.printBoard();

    if (roundNumber > 4) { // Here we check for a win
      let row = gameBoard.getRowString();

      let col = gameBoard.getColString();

      let [mainDiag, secondaryDiag] = gameBoard.getDiagonalsArr();
    }

    roundNumber++;
    switchActivePlayer();
  }

  return {gameBoard, playerArr, activePlayer};
})();