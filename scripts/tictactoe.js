function makeGameBoard() {
  const board = [];

  for(let i=0; i < 3; i++) {
    board[i] = [];
    for(let j=0; j < 3; j++) {
      board[i].push(makeCell());
    }
  }

  function placeMarker(row, col, playerMarker) {
    board[row][col].setMarker(playerMarker);
  }

  function returnMarker(row, col) {
    return board[row][col].getMarker();
  }

  function printBoard() {
    for(let i=0; i < 3; i++){
      let row = "";
      for(let j=0; j < 3; j++) {
        row += " " + board[i][j].getMarker();
      }
      console.log(row);
    }
  }

  return {placeMarker, returnMarker, printBoard}
}

function makeCell() {
  let marker = "*";

  function setMarker(playerMarker) {
    marker = playerMarker;
  }

  function getMarker() {
    return marker;
  }

  return {setMarker, getMarker};
}



