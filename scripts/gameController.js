import makeGameBoard from "./gameBoard.js";
import { grid, updateMessage, removeOldGrid } from "./domLogic.js";

// game()
// makePlayer()
// selectRandomPlayer()

const game = (function(player1Name = "Player 1", player2Name = "Player 2") {
  if(document.querySelector('.game-grid')) {
    removeOldGrid();
  }
  
  const gameBoard = makeGameBoard();
  const gridContainer = document.querySelector('.grid-container');
  const messageBoard = document.querySelector('.message-box>h2');
  let message;
  let roundNumber = 1;

  //grid(gridContainer, gameBoard, activePlayer);

  const playerArr = [makePlayer(player1Name, "x"), makePlayer(player2Name, "o")];

  let activePlayer = selectRandomPlayer(playerArr);

  grid(gridContainer, gameBoard, activePlayer, roundNumber, playerArr, message, messageBoard);

  message = `${activePlayer.getPlayerName()}'s turn`;
  updateMessage(message, messageBoard);
});

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

function selectRandomPlayer(playerArr) {
  let random = Math.floor(Math.random()*2);

  return playerArr[random];
}

export default game;