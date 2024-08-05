import GameState from '../enums/gameState.js';
import { winnerCheckingSlidingWindow } from '../utils/winnerCheck.js';
import Board from './board.js';
import Player from './player.js';
import Role from '../enums/role.js';

/**
 * Represents a game object
 * 
 * @property {number} size - the size of the board.
 * @property {Board} board - represents the game board.
 * @property {Player} player1 - represents player 1.
 * @property {Player} player2 - represents player 2.
 * @property {Player} currentPlayer - represents active player in their turn.
 * @property {GameState} state - The current state of the game.
 */
export default class Game {
    /**
     * 
     * @param {number} size - The size of the board.
     * @param {number} winLength - The length of winning line on board.
     */
    constructor(size = 3, winLength = 3) {
        this.size = size;
        this.winLength = winLength;
        this.board = new Board(size);
        this.player1 = new Player('Player 1', 'X', Role.P1);
        this.player2 = new Player('Player 2', 'O', Role.P2);
        this.currentPlayer = this.player1;
        this.state = GameState.PREPARING;
        this.roundScore = {
            p1Score: 0,
            p2Score: 0
        };
        this.roundWinner = Role.NONE;
        this.matchScore = {
            p1Score: 0,
            p2Score: 0
        };
        this.matchWinner = Role.NONE;
    }

    /**
     * Resets the current game’s score and cleans the board.
     * 
     * @returns {void}
     */
    resetGame() {
        this.state = GameState.PREPARING;
        this.board.reset();
        this.currentPlayer = this.player1;
        this.roundWinner = Role.NONE;
        this.roundScore = { p1Score: 0, p2Score: 0 };
    }
    /**
     * Prepares to start a game by changing the game state to ongoing and performing other necessary tasks.
     * 
     * @returns {void}
     */
    startGame() {
        this.state = GameState.ONGOING;
    }
    /**
     * Resets the match and resets the entire match score.
     * 
     * @returns {void}
     */
    resetMatch() {
        this.resetGame();
        this.matchScore = { p1Score: 0, p2Score: 0 };
    }
    /**
     * Prepares to start a match by resetting the match and starting a set.
     * 
     * @returns {void}
     */
    startMatch() {
        this.resetMatch();
        this.startGame();
    }

    checkWinner(row, col) {
        return winnerCheckingSlidingWindow(this.board.cells, this.currentPlayer.mark, row, col, this.winLength);
    }

    makeMove(row, col) {
        if (this.state !== GameState.ONGOING) return;
        if (this.board.placeMark(row, col, this.currentPlayer.mark)) {
            if (this.checkWinner(row, col)) {
                this.winner = this.currentPlayer;
                this.state = GameState.FINISHED;
                this.currentPlayer.score++;
                return `${this.currentPlayer.name} wins!`;
            }
            this.swapTurns();
        }
    }

    swapTurns() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
}
