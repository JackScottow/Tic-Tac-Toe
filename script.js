const playerOneInput = document.querySelector("#playerOneInput");
const playerTwoInput = document.querySelector("#playerTwoInput");
const game = document.querySelector("#game");
const startGame = document.querySelector("#start-game");
const squares = document.querySelectorAll("#board div");
const gameText = document.querySelector("#game-text");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset");
const winArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var win = false;
var winner = "";

startButton.addEventListener("click", () => {
  updatePlayer();
});

resetButton.addEventListener("click", () => {
  reset();
});

squares.forEach((square) => {
  square.addEventListener("click", () => {
    let tileNum = parseInt(square.dataset.x);
    if (!win) {
      if (playerOne.turn && !playerOne.playLoc.includes(tileNum) && !playerTwo.playLoc.includes(tileNum)) {
        square.classList.add(playerOne.symbol);
        playerOne.playLoc.push(tileNum);
        changeTurn();
        updateText();
        checkWin();
      } else if (playerTwo.turn && !playerOne.playLoc.includes(tileNum) && !playerTwo.playLoc.includes(tileNum)) {
        square.classList.add(playerTwo.symbol);
        playerTwo.playLoc.push(tileNum);
        changeTurn();
        updateText();
        checkWin();
      }
    }
  });
});

const createPlayer = (name, symbol, turn, playLoc) => {
  return { name, symbol, turn, playLoc };
};

const playerOne = createPlayer("Player One", "X", true, []);
const playerTwo = createPlayer("Player Twe", "O", false, []);

const updatePlayer = () => {
  playerOne.name = playerOneInput.innerText;
  playerTwo.name = playerTwoInput.innerText;
  updateText();
  startGame.style.display = "none";
  game.style.display = "flex";
};

const changeTurn = () => {
  playerOne.turn = !playerOne.turn;
  playerTwo.turn = !playerTwo.turn;
};

const updateText = () => {
  if (win) {
    gameText.innerHTML = `${winner} wins!`;
    resetButton.innerText = "Play Again!";
  } else if (playerOne.turn) {
    gameText.innerHTML = `${playerOne.name} (${playerOne.symbol})'s Turn`;
  } else if (playerTwo.turn) {
    gameText.innerHTML = `${playerTwo.name} (${playerTwo.symbol})'s Turn`;
  }
};

const reset = () => {
  squares.forEach((square) => {
    square.classList.remove(playerOne.symbol);
    square.classList.remove(playerTwo.symbol);
  });
  win = false;
  updateText();
  playerOne.playLoc.length = 0;
  playerTwo.playLoc.length = 0;
  startGame.style.display = "flex";
  game.style.display = "none";
  resetButton.innerText = "Reset Game";
};

const checkWin = () => {
  winArr.forEach((subArr) => {
    if (subArr.every((loc) => playerOne.playLoc.includes(loc))) {
      winner = playerOne.name;
      win = true;
      updateText();
    } else if (subArr.every((loc) => playerTwo.playLoc.includes(loc))) {
      winner = playerTwo.name;
      win = true;
      updateText();
    } else if (playerOne.playLoc.length + playerTwo.playLoc.length === 9) {
      gameText.innerText = "Draw!";
      resetButton.innerText = "Play Again!";
    }
  });
};
