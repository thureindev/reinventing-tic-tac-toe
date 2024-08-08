import Board from './board.js';
import Player from './player.js';
import Role from '../enums/role.js';
import GameState from '../enums/gameState.js';
import { winnerCheckingSlidingWindow } from '../utils/winnerCheck.js';

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
     */
    constructor(boardSize = 3, winLength = 3, numPieces = 5, fifoOrder = true) {
        this.winLength = winLength;
        this.numPieces = numPieces;
        this.fifoOrder = fifoOrder;

        this.board = new Board(boardSize);
        this.player1 = new Player('Player 1', 'X', Role.P1);
        this.player2 = new Player('Player 2', 'O', Role.P2);
        this.currentPlayer = this.player1;
        this.winner = Role.NONE;

        this.firstTurn = this.player1;
        this.totalMatchesPlayed = 0;
        this.state = GameState.READY;
    }
    updateWinLength(len) {
        if (this.state !== GameState.ONGOING) {
            this.winLength = len;
        }
    }
    /**
     * 
     */
    readyGame() {
        this.state = GameState.PREPARING;
        this.board.updateSize(this.board.xLen, this.board.yLen);
        this.currentPlayer = this.firstTurn;
        this.winner = Role.NONE;
        this.state = GameState.READY;
    }
    /**
     * 
     * @param {Player} [firstTurnPlayer] 
     */
    resetMatch(firstTurnPlayer=this.player1) {
        this.player1.score = 0;
        this.player2.score = 0;

        this.firstTurn = firstTurnPlayer;
        this.totalMatchesPlayed = 0;
        this.readyGame();
    }
    /**
     * Prepares to start a match by resetting the match and starting a set.
     * 
     */
    startGame() {
        this.state = GameState.ONGOING;
    }
    nextGame() {
        this.swapFirstTurn();
        this.readyGame();
    }

    updateGameStateByLastMove(posX, posY) {
        if (this.checkWinner(posX, posY)) {
            // player ___ wins
            this.winner = this.currentPlayer;
            this.currentPlayer.score ++;
            this.state = GameState.FINISHED;
            this.totalMatchesPlayed ++;
        }
        else if (this.checkValidMoves()) {
            // game continues
            this.swapTurns();
            this.state = GameState.ONGOING;
        }
        else {
            // draw
            this.winner = Role.NONE;
            this.player1.score += 0.5;
            this.player2.score += 0.5;
            this.state = GameState.FINISHED;
            this.totalMatchesPlayed ++;
        }
    }
    /**
     * 
     * @param {number} rowPos 
     * @param {number} colPos 
     * @returns 
     */
    checkWinner(rowPos, colPos) {
        return winnerCheckingSlidingWindow(this.board.cells, this.currentPlayer.role, rowPos, colPos, this.winLength);
    }

    checkValidMoves() {
        return (this.board.totalOccupiedCells < this.board.totalCells);
    }

    playerMakeMove(rowPos, colPos) {
        // only proceed if game is ongoing
        if (this.state !== GameState.ONGOING) return false;

        const isMarkPlaced = this.board.placeMark(rowPos, colPos, this.currentPlayer.role);
        if (isMarkPlaced) {
            return true;
        }
        return false;
    }

    swapTurns() {
        return this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
    swapFirstTurn() {
        return this.firstTurn = this.firstTurn === this.player1 ? this.player2 : this.player1;
    }
}
