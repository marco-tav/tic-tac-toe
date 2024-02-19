import { updateDOMBoard, removeListenersOnGameEnd, updateMessage } from "./domLogic.js";

// playRound()
// switchActivePlayer()
// getCoordinates()
// checkWin()

function playRoundWrapper(gameBoard, activePlayer, roundNumber, playerArr, message, messageBoard) {
  // const board = gameBoard;
  
  const playRound = function(e) {
    const [x, y] = getCoordinates(e.target);

    gameBoard.placeMarker(x, y, activePlayer.getPlayerMarker());
  
    updateDOMBoard(e.target, activePlayer.getPlayerMarker());
  
    const win = checkWin(x, y, gameBoard, activePlayer.getPlayerMarker());
    
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
    
    switchActivePlayer(activePlayer, playerArr);
    roundNumber++;
  
    if(!win && message !== "it's a tie!") {
      message = `${activePlayer.getPlayerName()}'s turn`;
      updateMessage(message, messageBoard);
    } 
  }

  return playRound;
}

function switchActivePlayer(activePlayer, playerArr) {
  activePlayer = activePlayer.getPlayerName() === playerArr[0].getPlayerName() ? playerArr[1] : playerArr[0];
}

function getCoordinates(cell) {
  let row = cell.getAttribute('data-row');
  let col = cell.getAttribute('data-col');

  return [row, col]
}

function checkWin(x, y, gameBoard, marker) {
  let win = false;

  const rowStr = gameBoard.getRowString(x);
  const colStr = gameBoard.getColString(y);
  const [mainDiag, secondaryDiag] = gameBoard.getDiagonalsArr();

  let rowWin = rowStr === `${marker}${marker}${marker}`;
  let colWin = colStr === `${marker}${marker}${marker}`;
  let mainDiagWin = mainDiag === `${marker}${marker}${marker}`;
  let secondaryDiagWin = secondaryDiag === `${marker}${marker}${marker}`;

  if(rowWin || colWin || mainDiagWin || secondaryDiagWin) {
    win = true;
  }

  return win;
}

export default playRoundWrapper;