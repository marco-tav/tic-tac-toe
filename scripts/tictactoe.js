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

  const player1 = makePlayer(player1Name, "X");
  const player2 = makePlayer(player2Name, "0");

  const playerArr = [player1, player2];

  function selectRandomPlayer() {
    let random = Math.floor(Math.random()*2);

    return playerArr[random];
  }

  function switchActivePlayer() {
    this.activePlayer = this.activePlayer.getPlayerName() === "Player 1" ? this.activePlayer = playerArr[1] : this.activePlayer = playerArr[0];
  }

  let activePlayer = selectRandomPlayer();

  return {gameBoard, playerArr, activePlayer, switchActivePlayer};
})();