const gameBoard = function makeGameBoard() {
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
      let row = "";
      for(let j=0; j < 3; j++) {
        row += " " + board[i][j].getValue();
      }
      console.log(row);
    }
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

  return(getPlayerName, getPlayerMarker)
}

