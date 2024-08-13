import Role from "../enums/role";

/**
 * Represents a player object
 */
export default class Player {
    /**
     * Creates an instance of a player object.
     * 
     * @param {string} name - Player name
     * @param {string} mark - Mark symbol represented by player
     * @param {Role} role - player 1 or 2 role represented by player
     */
    constructor(name, mark, role) {
        this.name = name;
        this.mark = mark; // An img URL or a simple string
        this.role = role;
        this.score = 0;

        // for twist-tac-toe
        this.moveHistory = [];
        this.totalMoves = 0;

        this.numPieces = 0;
    }
    /**
     * Rename player.
     * 
     * @param {string} newName - player's name
     * @returns {boolean} - success true or false
     */
    rename(newName) {
        this.name = newName;
        return true;
    }
    /**
     * Change player's mark 'X', 'O' or any character. Image URL strings are not working yet.
     * 
     * @param {string} newMark - player's mark
     * @returns {boolean} - success true or false
     */
    changeMark(newMark) {
        this.mark = newMark;
        return true;
    }
    /**
     * Update number of pieces the player has. 
     */
    updateNumPieces(num) {
        this.numPieces = num;
    }
    /**
     * Add score.
     * 
     * @param {number} score - player's score
     * @returns {boolean} - success true or false
     */
    addScore(score) {
        this.score += score;
        return true;
    }
    /**
     * Zero out player's score.
     * @returns {boolean} - success true or false
     */
    resetScore() {
        this.score = 0;
        return true;
    }
    /**
     * Update player's move to move history
     * 
     * @param {number} x - row position on board
     * @param {number} y - column position on board
     * @returns {boolean} - success true or false
     */
    updatePlayerMove(x, y) {
        const len = this.moveHistory.push({ x, y });
        this.totalMoves = len;
        return true;
    }
    /**
     * Clear player's move history
     * @returns {boolean} - success true or false
     */
    resetPlayerMoveHistory() {
        this.moveHistory = [];
        this.totalMoves = 0;
        return true;
    }

    /**
     * 
     * Getter functions
     * =====================================================
     * 
     * Getter - name
     * @returns {string} - returns player name
     */
    getName() {
        return this.name;
    }
    /**
     * Getter - mark
     * @returns {string} - returns player mark
     */
    getMark() {
        return this.mark;
    }
    /**
     * Getter - role
     * @returns {Role} - returns player role
     */
    getRole() {
        return this.role;
    }
    /**
     * Getter - score
     * @returns {number} - returns player score
     */
    getScore() {
        return this.score;
    }
    /**
     * Getter - moveHistory
     * @function
     * @returns {Object[]} An array of objects, where each object is a dictionary with number values.
     * @example
     * // Returns: [ { x: 2, y: 3 }, { x: 5, y: 2 } ]
     * getStringObjects();
     */
    getMoveHistory() {
        return this.moveHistory;
    }
    /**
     * Getter - totalMoves
     * @returns {number} - returns total moves played by the player
     */
    getTotalMoves() {
        return this.totalMoves;
    }
    /**
     * 
     * @returns {number} - returns total number of pieces to be played on board. 
     */
    getNumPieces() {
        return this.numPieces;
    }
}
