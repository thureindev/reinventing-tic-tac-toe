const gameData = {
    boardSize: 3,
    winningLineLength: 3,
    numPieces: 3,
    removeByOrder: false
};

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
let currentTurn = 'X';

document.getElementById('board-size').addEventListener('input', (e) => {
    gameData.boardSize = e.target.value;

    console.log(gameData);
});

document.getElementById('winning-length').addEventListener('input', (e) => {
    gameData.winningLineLength = e.target.value;

    console.log(gameData);
});

document.getElementById('num-pieces').addEventListener('input', (e) => {
    gameData.numPieces = e.target.value;

    console.log(gameData);
});

document.getElementById('remove-order').addEventListener('change', (e) => {
    gameData.removeByOrder = e.target.checked;

    console.log(gameData);
});

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {
    const cell = e.target;
    if (isEmptyCell(cell)) {
        cell.innerText = currentTurn;
        swapTurns();
    }
    else {
        // show error
        console.log('cell not empty');
    }
}

function swapTurns() {
    // Swap turn between 'X' and 'O'
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function isEmptyCell(cell) {
    return cell.innerText === '' ? true : false;
}
