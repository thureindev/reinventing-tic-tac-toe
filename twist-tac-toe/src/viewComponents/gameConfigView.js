import { config } from "../data/GameConfig";
import configController from "../controllers/configController";
import gameController from "../controllers/gameController";

const gameConfigView = Object.freeze({
    setupGameConfig: (element) => {
        element.innerHTML = `
        <h1>Classic Tic-Tac-Toe</h1>
        <div class="control-group">
            <div class="board-config-group">
                <div class="input-group">
                    <label for="board-size-x">Board Size X:</label>
                    <input type="number" id="board-size-x" name="board-size-x" min="3" max="100" value="${config.boardSizeX}">
                </div>
                <div class="input-group">
                    <label for="board-size-y">Board Size Y:</label>
                    <input type="number" id="board-size-y" name="board-size-y" min="3" max="100" value="${config.boardSizeY}">
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
            </div>
            <div class="game-cycle-group">
                <button id="start-match">Start Match</button>
                <button id="next-game">Next Game</button>
                <button id="reset-match">Reset Match</button>
            </div>
        </div>
        `
        document.getElementById('board-size-x').addEventListener('input', (e) => {
            const x = Number(e.target.value);
            config.boardSizeX = x;
            // for view
            configController.emit('config-board-size-changed', x, config.boardSizeY);
            // for game data
            gameController.emit('config-board-size-changed', x, config.boardSizeY);
        });
        document.getElementById('board-size-y').addEventListener('input', (e) => {
            const y = Number(e.target.value);
            config.boardSizeY = y;
            // for view
            configController.emit('config-board-size-changed', config.boardSizeX, y);
            // for game data
            gameController.emit('config-board-size-changed', config.boardSizeX, y);
        });

        document.getElementById('win-length').addEventListener('input', (e) => {
            const len = Number(e.target.value);
            config.winningLineLength = len;
            gameController.emit('config-winLength-changed', len);
        });

        document.getElementById('num-pieces').addEventListener('input', (e) => {
            config.numPieces = Number(e.target.value);
        });

        document.getElementById('fifo-order').addEventListener('change', (e) => {
            config.fifoOrder = e.target.checked;
        });

        document.getElementById('start-match').addEventListener('click', (e) => {
            gameController.emit('start-match');
        })
        document.getElementById('next-game').addEventListener('click', (e) => {
            gameController.emit('next-game');
        })
        document.getElementById('reset-match').addEventListener('click', (e) => {
            gameController.emit('reset-match');

            configController.emit('reset-match');
        })
    }
});

export default gameConfigView;