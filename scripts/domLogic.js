function updateDOMBoard(cell, marker) {
  cell.innerText = marker;
}

function removeOldGrid() {
  const oldGrid = document.querySelector('.game-grid');

  oldGrid.remove(); 
}

function grid(container) {
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
}

export {updateDOMBoard, removeOldGrid, grid};