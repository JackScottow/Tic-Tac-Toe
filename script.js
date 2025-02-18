class TicTacToe {
  constructor() {
    this.initializeElements();
    this.initializeGame();
    this.addEventListeners();
  }

  initializeElements() {
    this.menuScreen = document.getElementById("menu");
    this.gameScreen = document.getElementById("game");
    this.player1Input = document.getElementById("player1");
    this.player2Input = document.getElementById("player2");
    this.startButton = document.getElementById("start");
    this.resetButton = document.getElementById("reset");
    this.newGameButton = document.getElementById("new-game");
    this.statusDisplay = document.getElementById("status");
    this.score1Display = document.getElementById("score1");
    this.score2Display = document.getElementById("score2");
    this.cells = document.querySelectorAll(".cell");
  }

  initializeGame() {
    this.board = Array(9).fill("");
    this.currentPlayer = "X";
    this.scores = { X: 0, O: 0 };
    this.gameActive = true;
    this.players = { X: "Player 1", O: "Player 2" };
  }

  addEventListeners() {
    this.startButton.addEventListener("click", () => this.startGame());
    this.resetButton.addEventListener("click", () => this.resetBoard());
    this.newGameButton.addEventListener("click", () => this.showMenu());
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => this.handleCellClick(cell));
    });
  }

  startGame() {
    this.players.X = this.player1Input.value || "Player 1";
    this.players.O = this.player2Input.value || "Player 2";
    this.menuScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");
    this.updateStatus();
  }

  handleCellClick(cell) {
    const index = cell.dataset.index;
    if (this.board[index] === "" && this.gameActive) {
      this.board[index] = this.currentPlayer;
      cell.textContent = this.currentPlayer;

      if (this.checkWin()) {
        this.handleWin();
      } else if (this.checkDraw()) {
        this.handleDraw();
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.updateStatus();
      }
    }
  }

  checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) => {
      return pattern.every((index) => {
        return this.board[index] === this.currentPlayer;
      });
    });
  }

  checkDraw() {
    return this.board.every((cell) => cell !== "");
  }

  handleWin() {
    this.gameActive = false;
    this.scores[this.currentPlayer]++;
    this.updateScores();
    this.statusDisplay.textContent = `${this.players[this.currentPlayer]} wins!`;
  }

  handleDraw() {
    this.gameActive = false;
    this.statusDisplay.textContent = "It's a draw!";
  }

  resetBoard() {
    this.board = Array(9).fill("");
    this.cells.forEach((cell) => (cell.textContent = ""));
    this.gameActive = true;
    this.currentPlayer = "X";
    this.updateStatus();
  }

  showMenu() {
    this.gameScreen.classList.add("hidden");
    this.menuScreen.classList.remove("hidden");
    this.resetBoard();
    this.scores = { X: 0, O: 0 };
    this.updateScores();
  }

  updateStatus() {
    this.statusDisplay.textContent = `${this.players[this.currentPlayer]}'s Turn (${this.currentPlayer})`;
  }

  updateScores() {
    this.score1Display.textContent = this.scores.X;
    this.score2Display.textContent = this.scores.O;
    document.getElementById("score1-label").textContent = `${this.players.X} (X)`;
    document.getElementById("score2-label").textContent = `${this.players.O} (O)`;
  }
}

// Initialize the game
const game = new TicTacToe();
