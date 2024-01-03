const gameBoard = (function makeGameBoard() {
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

  function returnMarker(row, col) {
    return board[row][col].getValue();
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

  function getBoard() {
    return board;
  }

  return {placeMarker, returnMarker, printBoard, getBoard}
})();


function makeCell() {
  let value = "*";
  let markerPlaced = false;

  function changeValue(playerMarker) {
    value = playerMarker;
    updateMarkerPlaced();
  }

  function updateMarkerPlaced() {
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


const game = (function gameController(board) {

})(gameBoard);