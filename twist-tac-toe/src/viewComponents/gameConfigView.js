import { ele } from "./_htmlElementSelector";
import { config } from "../data/GameConfig";
import gameController from "../controllers/gameController";

const gameConfigView = Object.freeze({
    /**
     * Set up game config view
     */
    setupGameConfigView: () => {
        ele.getGameConfig().innerHTML = `
        <h1>Twist-Tac-Toe</h1>
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

        /**
         * Event listeners
         * ==============================================================
         */

        document.getElementById('board-size-x').addEventListener('input', (e) => {
            const x = Number(e.target.value);
            gameController.emit('config-board-size-changed', x, config.boardSizeY);
        });
        document.getElementById('board-size-y').addEventListener('input', (e) => {
            const y = Number(e.target.value);
            gameController.emit('config-board-size-changed', config.boardSizeX, y);
        });

        document.getElementById('win-length').addEventListener('input', (e) => {
            const len = Number(e.target.value);
            gameController.emit('config-win-length-changed', len);
        });

        document.getElementById('num-pieces').addEventListener('input', (e) => {
            const num = Number(e.target.value);
            gameController.emit('config-num-pieces-changed', num);
        });

        document.getElementById('fifo-order').addEventListener('change', (e) => {
            const isFifo = e.target.checked;
            gameController.emit('config-fifo-order-changed', isFifo);
        });

        document.getElementById('start-match').addEventListener('click', (e) => {
            gameController.emit('start-match');
        })
        document.getElementById('next-game').addEventListener('click', (e) => {
            gameController.emit('next-game');
        })
        document.getElementById('reset-match').addEventListener('click', (e) => {
            gameController.emit('reset-match');
        })
    }
});

export default gameConfigView;