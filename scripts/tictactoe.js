import game from "./gameController.js";

// Function that starts the game when start button is clicked
const startGame = (function() {
  const startBtn = document.querySelector('button');
  const p1name = document.getElementById('p1name');
  const p2name = document.getElementById('p2name');

  const oldNames = {p1OldName: "", p2OldName: ""};  

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!p1name.value) {
      p1name.value = "player1";
    }

    if(!p2name.value) {
      p2name.value = "player2";
    }

    game(p1name.value, p2name.value);

    oldNames.p1OldName = p1name.value;
    oldNames.p2OldName = p2name.value;

    p1name.value = "";
    p2name.value = "";

    const restartGame = (function() {
      const restartBtn = document.getElementById('restart');
      
      restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        game(oldNames.p1OldName, oldNames.p2OldName);
      })
    })();
  });
  
})();