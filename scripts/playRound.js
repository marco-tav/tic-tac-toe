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