import Board from './board.js';
import Player from './player.js';
import Role from '../enums/role.js';
import GameState from '../enums/gameState.js';
import GameProp from '../enums/gameProp.js';
import { winnerCheckingSlidingWindow } from '../utils/winnerCheck.js';
import { gameConfig } from '../../data/GameConfig.js';

/**
 * Represents a game object
 * 
 * @property {number} boardSize - the boardSize of the board.
 * @property {Board} board - represents the game board.
 * @property {Player} player1 - represents player 1.
 * @property {Player} player2 - represents player 2.
 * @property {Player} currentPlayer - represents active player in their turn.
 * @property {GameState} state - The current state of the game.
 */
export default class Game {
    /**
     * 
     * @param {number} boardSize - The boardSize of the board.
     * @param {number} winLength - The length of winning line on board.
     * @param {number} numPieces - The pieces players can play on board.
     * @param {boolean} isFifoOrder - First in first out elimination option for pieces played on board .
     */
    constructor(
        boardSizeX = gameConfig.boardSizeX,
        boardSizeY = gameConfig.boardSizeY,
        winLength = gameConfig.winLength,
        numPieces = gameConfig.numPieces,
        isFifoOrder = gameConfig.isFifoOrder
    ) {
        this.config = {
            winLength: winLength,
            isLimitedPieces: false,
            numPieces: numPieces,
            isFifoOrder: isFifoOrder,
        }
        this.board = new Board(boardSizeX, boardSizeY);
        this.player1 = new Player('Player 1', 'X', Role.P1);
        this.player2 = new Player('Player 2', 'O', Role.P2);
        this.firstTurnPlayer = this.player1;
        this.currentPlayer = this.firstTurnPlayer;
        this.winner = Role.NONE;
        this.totalGamesPlayed = 0;
        // for visual cue
        this.winCells = [];
        // game state tracker
        this.state = GameState.READY;
    }
    /**
     * ==============================================================
     * ================= GAME-PREP-PUBLIC-FUNCS =====================
     */
    /**
     * -----------------------------------------------------------------
     * 
     * Prepare the game by resetting the gaem board, sorting out turns and resetting players attributes. 
     */
    readyGame(firstTurnPlayer = this.firstTurnPlayer) {
        this.state = GameState.PREPARING;

        this.board.resetBoard();
        this.player1.resetPlayerMoveHistory();
        this.player2.resetPlayerMoveHistory();
        this.currentPlayer = firstTurnPlayer;
        this.winner = Role.NONE;
        this.winCells = [];

        this.state = GameState.READY;
    }
    /**
     * -----------------------------------------------------------------
     * 
     * @param {Player} [firstTurnPlayer] 
     */
    resetMatch(firstTurnPlayer = this.player1) {
        this.player1.resetScore();
        this.player2.resetScore();
        this.totalGamesPlayed = 0;
        this.firstTurnPlayer = firstTurnPlayer;
        this.readyGame();
    }
    /**
     * -----------------------------------------------------------------
     * 
     * Prepares to start a match by resetting the match and starting a set.
     */
    startGame() {
        // set game mode
        // 
        // start game
        this.state = GameState.ONGOING;
    }
    /**
     * -----------------------------------------------------------------
     * 
     * Prepares to ready up next game by swapping players' turns and carry out ready up procedures.
     */
    nextGame() {
        this.swapFirstTurn();
        this.readyGame();
    }
    /**
     * ==============================================================
     * ==================== UPDATE-PUBLIC-FUNCS =====================
     * 
     * -----------------------------------------------------------------
     * Update game configuration data
     * 
     * @param {string} prop - Name of the game object property to update
     * @param {Object} arg - Object containing passed arguments
     * @returns 
     */
    updateGameConfig(prop, arg) {
        // Updating game configs is not allowed during an ongoing match.
        if (!this.isDuringMatch()) {
            // select the property to update and call the function.
            switch (prop) {
                case GameProp.SIZE:
                    return this.updateConfigProp().size(arg['x'], arg['y']);
                case GameProp.WIN_LENGTH:
                    console.log(this.updateConfigProp());
                    return this.updateConfigProp().winLength(arg['len']);
                case GameProp.IS_LIMITED_PIECES:
                    return this.updateConfigProp().isLimitedPieces(arg['isLimited']);
                case GameProp.NUM_PIECES:
                    return this.updateConfigProp().numPieces(arg['num']);
                case GameProp.IS_FIFO_ORDER:
                    return this.updateConfigProp().isFifoOrder(arg['isFifo']);
                default:
                    return false;
            }
        }
        return false;
    }
    /**
     * -----------------------------------------------------------------
     * 
     * Update game state after checking winner and draw conditions. If nothing else, continue the game
     * @param {number} posX - X axis position on game board
     * @param {number} posY - Y axis position on game board
     */
    updateGameStateByLastMove(posX, posY) {
        const winCells = this.checkWinner(posX, posY);
        if (winCells) {
            // player ___ wins
            this.winner = this.currentPlayer;
            this.winCells = winCells;
            this.currentPlayer.addScore(1);
            this.totalGamesPlayed++;
            this.state = GameState.FINISHED;
        }
        else if (this.checkValidMoves()) {
            // game continues
            this.swapTurns();
            this.state = GameState.ONGOING;
        }
        else {
            // draw
            this.winner = Role.NONE;
            this.player1.addScore(0.5);
            this.player2.addScore(0.5);
            this.totalGamesPlayed++;
            this.state = GameState.FINISHED;
        }
    }
    /**
     * ==============================================================
     * ====================== CORE-GAME-LOGIC =======================
     */
    /**
     * -----------------------------------------------------------------
     * 
     * @param {number} x 
     * @param {number} y 
     * 
     * @returns {Object[] || boolean} - returns array of objects or false
     * @example [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}]
     */
    checkWinner(x, y) {
        return winnerCheckingSlidingWindow(this.board.cells, this.currentPlayer.role, x, y, this.config.winLength);
    }
    /**
     * -----------------------------------------------------------------
     * Validate there are legal moves left to play on board.
     * 
     * @returns {boolean} - returns true or false after checking valid moves.
     */
    checkValidMoves() {
        // The logic used to validate moves will be affected by 'isLimitedPieces' and 'isFifoOrder'
        return this.board.hasPlayableSquares();
    }
    /**
     * -----------------------------------------------------------------
     * Validate the player made a legal move and update data for it.
     * 
     * @param {number} x - X axis position on game board
     * @param {number} y - Y axis position on game board
     * @returns {boolean} - boolean
     */
    playerMakeMove(x, y) {
        // The logic used to validate moves will be affected by 'isLimitedPieces' and 'isFifoOrder'

        // only proceed if game is ongoing
        if (this.state !== GameState.ONGOING) return false;

        const isMarkPlaced = this.board.placeMark(x, y, this.currentPlayer.role);
        if (isMarkPlaced) {
            this.currentPlayer.updatePlayerMove(x, y);
            return true;
        }
        return false;
    }
    eliminatePreviousMovePiece(cellX = 0, cellY = 0) {
        // gameplay logic check
        const isLimited = this.getIsLimitedPieces();
        const playerTotalMoves = this.currentPlayer.getTotalMoves();
        const numPieces = this.getNumPiecesEachPlayer();

        // Gameplay logic check
        if (isLimited && playerTotalMoves > numPieces) {
            if (this.getIsFifoOrder()) {
                const { x, y } = this.currentPlayer.getMoveHistory()[playerTotalMoves - numPieces - 1];
                
                this.board.removeMark(x, y);
                return { x, y };
            }
            else {
                // const history = this.currentPlayer.getMoveHistory().slice
            }
        }
        return false;
    }
    /**
     * ==============================================================
     * ======================= HELPER-FUNCS =========================
     */
    /**
     * -----------------------------------------------------------------
     * 
     * @returns {Player} - swap turn and returns Player object 
     */
    swapTurns() {
        return this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
    /**
     * 
     * @returns {Player} - swap turn and returns Player object that determines who play first this game.
     */
    swapFirstTurn() {
        return this.firstTurnPlayer = this.firstTurnPlayer === this.player1 ? this.player2 : this.player1;
    }
    /**
     * To check if the match is ongoing. 
     * 
     * @returns {boolean} - boolean
     */
    isDuringMatch() {
        if (this.state !== GameState.ONGOING && this.totalGamesPlayed <= 0) {
            return false;
        }
        return true;
    }
    /**
     * Update Number of Pieces for each player
     * 
     * @param {number} num - number of pieces each player has. 
     */
    updateNumPiecesEachPlayer(num) {
        this.config.numPieces = num;
        this.player1.updateNumPieces(num);
        this.player2.updateNumPieces(num);
    }
    /**
     * -----------------------------------------------------------------
     * Reusabel update config function
     * 
     */
    updateConfigProp() {
        return Object.freeze({
            /**
             * @param {number} x - 
             * @param {number} y - 
             * @returns {boolean} - boolean
             */
            size: (x, y) => {
                this.board.updateSize(x, y);
                // check the appropriate winLength and update it.
                if (x < this.config.winLength || y < this.config.winLength) {
                    const newWinLength = x < y ? x : y;
                    this.config.winLength = newWinLength;
                }
                return true;
            },
            /**
             * @param {number} len - 
             * @returns {boolean} - boolean
             */
            winLength: (len) => {
                // check the appropriate winLength
                if (this.getBoard().getSize()['x'] >= len || this.getBoard().getSize()['y'] >= len) {

                    // cannot be less than 3
                    if (len < 3) {
                        this.config.winLength = 3;
                    }
                    else {
                        this.config.winLength = len;
                    }
                    return true;
                }
                return false;
            },
            /**
             * 
             * @param {boolean} isLimited - 
             * @returns {boolean} - boolean
             */
            isLimitedPieces: (isLimited) => {
                this.config.isLimitedPieces = isLimited;
                // update num pieces accordingly. 
                // cannot be less than winlength
                if (isLimited === true && this.config.numPieces < this.config.winLength) {
                    this.config.numPieces = this.config.winLength;
                }
                return true;
            },
            /**
             * 
             * @param {number} num - 
             * @returns {boolean} - boolean
             */
            numPieces: (num) => {
                // check the appropriate winLength
                const sizeX = this.getBoard().getSize()['x'];
                const sizeY = this.getBoard().getSize()['y'];
                if (sizeX * sizeY >= num) {
                    this.updateNumPiecesEachPlayer(num);

                    if (this.config.numPieces < this.config.winLength) {
                        this.config.numPieces = this.config.winLength;
                    }
                    return true;
                }
                return false;
            },
            /**
             * 
             * @param {boolean} isFifo - 
             * @returns {boolean} - boolean
             */
            isFifoOrder: (isFifo) => {
                this.config.isFifoOrder = isFifo;
                return true;
            },

        });
    }
    /**
     * ==============================================================
     * ======================= GETTER-FUNCS =========================
     */
    /**
     * -----------------------------------------------------------------
     * @returns {number} - The length of winning decision line on board.
     */
    getWinningLineLength() {
        return this.config.winLength;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {boolean} - boolean
     */
    getIsLimitedPieces() {
        return this.config.isLimitedPieces;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {number} - Number of pieces each player has and can play on board.
     */
    getNumPiecesEachPlayer() {
        return this.config.numPieces;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {boolean} - First in first out elimination option for pieces played on board. 
     */
    getIsFifoOrder() {
        return this.config.isFifoOrder;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Board} - Game board
     */
    getBoard() {
        return this.board;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Player} - Get Player One object
     */
    getPlayer1() {
        return this.player1;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Player} - Get Player Two object
     */
    getPlayer2() {
        return this.player2;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Player} - Get Current Player object
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Role} - Get Role object which represents the winner of a game. 
     */
    getGameWinner() {
        return this.winner;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Role} - Get Role object of a player who's score is higher. Returns null if scores are equal
     */
    getMatchLeadingPlayer() {
        if (this.player1.score > this.player2.score) {
            return this.player1.role;
        }
        else if (this.player2.score > this.player1.score) {
            return this.player2.role;
        }
        return Role.NONE;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Object[]} - Get array of number objects. 
     * @example [{0, 2}, {1, 2}, {2, 2}]
     */
    getWinningSquaresOnBoard() {
        return this.winCells;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {Player} - returns player who play first turn this game.
     */
    getPlayerToPlayFirst() {
        return this.firstTurnPlayer;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {number} - total games played in this match.
     */
    getGamesPlayedInMatch() {
        return this.totalGamesPlayed;
    }
    /**
     * -----------------------------------------------------------------
     * @returns {GameState} - returns game state
     */
    getGameState() {
        return this.state;
    }
}
