let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let scoreX = 0;
let scoreO = 0;
let timerInterval;
let elapsedTime = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const toggleModeButton = document.getElementById('toggle-mode');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const timeDisplay = document.getElementById('time');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
toggleModeButton.addEventListener('click', toggleDarkMode);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || isGameOver) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    checkForWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (!isGameOver) updateStatus();
}

function checkForWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            updateScore(currentPlayer);
            statusDisplay.textContent = `¡JUGADOR ${currentPlayer} GANO!`;
            clearInterval(timerInterval);
            return;
        }
    }

    if (!board.includes('')) {
        isGameOver = true;
        statusDisplay.textContent = '¡EMPATE!';
        clearInterval(timerInterval);
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function updateStatus() {
    statusDisplay.textContent = `Turno de ${currentPlayer}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    elapsedTime = 0;
    timeDisplay.textContent = elapsedTime;
    clearInterval(timerInterval);
    startTimer();
    updateStatus();
}

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        timeDisplay.textContent = elapsedTime;
    }, 1000);
}

// Initialize the status text and start the timer when the page loads
updateStatus();
startTimer();
