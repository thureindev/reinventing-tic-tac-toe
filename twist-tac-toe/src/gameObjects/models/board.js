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
        this.cells = Array.from({ length: this.xLen }, () => Array(this.yLen).fill(null));
        
        this.totalCells = this.xLen * this.yLen;
        this.totalOccupiedCells = 0;
    }
    /**
     * Resets the game board to its initial state.
     * 
     * @returns {void}
     */
    updateSize(x, y) {
        this.xLen = x;
        this.yLen = y;
        this.cells = Array.from({ length: x }, () => Array(y).fill(null));

        this.totalCells = x * y;
        this.totalOccupiedCells = 0;
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
    placeMark(x, y, player, checkIsCellEmpty = true) {
        try {
            if (checkIsCellEmpty) {
                if (this.cells[x][y] === null) {
                    this.cells[x][y] = player;
                    this.totalOccupiedCells ++;
                    return true;
                }
                return false;
            }
            // no need to check cell empty.
            this.cells[x][y] = player;
            return true;

        } catch (err) { console.log(err); }
    }
}
