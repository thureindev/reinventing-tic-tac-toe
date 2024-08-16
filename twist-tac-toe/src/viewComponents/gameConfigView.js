import { ele } from "./_htmlElementSelector";
import gameController from "../controllers/gameController";

const gameConfigView = Object.freeze({
    /**
     * Set up game config view
     */
    setupGameConfigView: (config) => {
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
                    <label for="is-limited-pieces">Limited Pieces for each player:</label>
                    <input type="checkbox" id="is-limited-pieces" name="is-limited-pieces" ${config.isLimitedPieces ? 'checked' : ''}>
                </div>

                <div class="input-group">
                    <label for="num-pieces">Number of Pieces:</label>
                    <input type="number" id="num-pieces" name="num-pieces" min="3" max="100" value="${config.numPieces}"
                    ${config.isLimitedPieces ? '' : 'disabled'}>
                </div>

                <a id="game-file-save">
                    Save Game Result
                </a>
                

            </div>
            <div class="game-cycle-group">
                <button id="start-match">Start Match</button>
                <button id="next-game">Next Game</button>
                <button id="reset-match">Reset Match</button>
            </div>
        </div>
        `
        
        // Event listeners
        // ==============================================================

        ele.getInputBoardSizeX().addEventListener('input', (e) => {
            const x = Number(e.target.value);
            const y = config.boardSizeY;
            gameController.emit('changed-board-size', { x, y });
        });
        
        ele.getInputBoardSizeY().addEventListener('input', (e) => {
            const y = Number(e.target.value);
            const x = config.boardSizeX;
            gameController.emit('changed-board-size', { x, y });
        });

        ele.getInputWinLength().addEventListener('input', (e) => {
            const len = Number(e.target.value);
            gameController.emit('changed-win-length', len);
        });

        ele.getInputIsLimitedPieces().addEventListener('change', (e) => {
            const isLimited = e.target.checked;
            gameController.emit('changed-is-limited-pieces', isLimited);
        });

        ele.getInputNumPieces().addEventListener('input', (e) => {
            const num = Number(e.target.value);
            gameController.emit('changed-num-pieces', num);
        });

        ele.getBtnStartMatch().addEventListener('click', (e) => {
            gameController.emit('start-match');
        });

        ele.getBtnNextGame().addEventListener('click', (e) => {
            gameController.emit('next-game');
        });

        ele.getBtnResetMatch().addEventListener('click', (e) => {
            gameController.emit('reset-match');
        });

        ele.getBtnGameFileSave().addEventListener('click', (e) => {
            gameController.emit('save-game-result');
        });
    }
});

export default gameConfigView;