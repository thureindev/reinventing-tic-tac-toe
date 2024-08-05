import { config } from "./dataGameConfig";

export function setupGameConfig(element) {
    element.innerHTML = `
    <h1>Classic Tic-Tac-Toe</h1>
    <div class="input-group">
        <label for="board-size">Board Size:</label>
        <input type="number" id="board-size" name="board-size" min="3" max="100" value="${config.boardSize}">
    </div>
    <div class="input-group">
        <label for="win-length">Winning Line Length:</label>
        <input type="number" id="win-length" name="win-length" min="3" max="100" value="${config.winLength}">
    </div>
    <div class="input-group">
        <label for="num-pieces">Number of Pieces:</label>
        <input type="number" id="num-pieces" name="num-pieces" min="3" max="100" value="${config.numPieces}">
    </div>
    <div class="input-group">
        <label for="fifo-order">Remove by Order:</label>
        <input type="checkbox" id="fifo-order" name="fifo-order" ${config.fifoOrder && 'checked'}>
    </div>
    `
    document.getElementById('board-size').addEventListener('input', (e) => {
        config.boardSize = e.target.value;
        console.log(config);
    });
    
    document.getElementById('win-length').addEventListener('input', (e) => {
        config.winningLineLength = e.target.value;
        console.log(config);
    });
    
    document.getElementById('num-pieces').addEventListener('input', (e) => {
        config.numPieces = e.target.value;
        console.log(config);
    });
    
    document.getElementById('fifo-order').addEventListener('change', (e) => {
        config.fifoOrder = e.target.checked;
        console.log(config);
    });
}