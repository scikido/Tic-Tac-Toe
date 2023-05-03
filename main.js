let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.querySelector("#current-player");
const resetButton = document.querySelector("#reset-btn");

function renderBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = gameBoard[i];
  }
}

function handleMove(index) {
  if (gameOver) {
    return;
  }

  if (gameBoard[index] !== "") {
    return;
  }

  gameBoard[index] = currentPlayer;

  renderBoard();

  checkForWin();

  if (!gameOver) {
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerDisplay.textContent = currentPlayer;
}

function checkForWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      gameOver = true;
      highlightWinner(a, b, c);
      break;
    }
  }

  if (!gameOver && gameBoard.every((cell) => cell !== "")) {
    gameOver = true;
    announceDraw();
  }
}

function highlightWinner(a, b, c) {
  cells[a].classList.add("winner");
  cells[b].classList.add("winner");
  cells[c].classList.add("winner");
}

function announceDraw() {
  currentPlayerDisplay.textContent = "Draw!";
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayerDisplay.textContent = currentPlayer;

  for (let cell of cells) {
    cell.classList.remove("winner");
  }

  renderBoard();
}

board.addEventListener("click", function (event) {
  const cellIndex = event.target.id.slice(4);
  handleMove(cellIndex);
});

resetButton.addEventListener("click", resetGame);

renderBoard();
