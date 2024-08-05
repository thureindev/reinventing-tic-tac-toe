/**
 * Represents a game board.
 */
export default class Board {
    /**
     * Creates an instance of a board object.
     * 
     * @param {number} size - The size of the shape (used for both width and height if only one parameter is provided).
     * @param {number} [y=size] - The height of the shape. If not provided, it defaults to the size parameter.
     */
    constructor(size, y = size) {
        this.xLen = size;
        this.yLen = y;
        this.cells = Array.from({ length: xLen }, () => Array(yLen).fill(null));
    }
    /**
     * Resets the game board to its initial state.
     * 
     * @returns {void}
     */
    reset() {
        this.cells = Array.from({ length: this.xLen }, () => Array(this.yLen).fill(null));
    }
    /**
     * Places a mark for a player at the specified coordinates.
     * 
     * @param {number} x - The x-coordinate of the cell on 2D array board.
     * @param {number} y - The y-coordinate of the cell on 2D array board.
     * @param {string} player - The player marking the cell.
     * @returns {boolean} True if the mark was successfully placed, false otherwise.
     * 
     */
    placeMark(x, y, player) {
        if (this.cells[x][cyoyl] === null) {
            this.cells[x][y] = player;
            return true;
        }
        return false;
    }
}
