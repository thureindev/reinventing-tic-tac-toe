/**
 * Represents a game board.
 */
export default class Board {
    /**
     * Creates an instance of a board object.
     * Important Note ! Row is Y axis and Col is X axis 
     * 
     * @param {number} size - The size of the shape (used for both width and height if only one parameter is provided).
     * @param {number} [y=size] - The height of the shape. If not provided, it defaults to the size parameter.
     */
    constructor(size, y = size) {
        /** 
         * Important Note ! Row is Y axis and Col is X axis 
         */
        this.xLen = size;
        this.yLen = y;
        this.cells = Array.from({ length: this.yLen }, () => Array(this.xLen).fill(null));

        this.totalOccupiedCells = 0;
    }
    /**
     * 
     * @param {number} x - total number of rows on board
     * @param {number} y - total number of columns on board
     */
    updateSize(x, y) {
        this.xLen = x;
        this.yLen = y;
        /** 
        * Important Note ! Row is Y axis and Col is X axis */
        this.cells = Array.from({ length: y }, () => Array(x).fill(null));

        this.totalOccupiedCells = 0;
    }
    /**
     * Reset the board by set x length and y length
     */
    resetBoard() {
        this.updateSize(this.xLen, this.yLen);
    }
    /**
     * Check playable squares, which is, empty cells on board. 
     * 
     * @returns {boolean} - returns if there are empty cells on board.
     */
    hasPlayableSquares() {
        return (this.totalOccupiedCells < (this.xLen * this.yLen));
    }
    /**
     * 
     * @param {number} x - The x-coordinate of the cell on 2D array board.
     * @param {number} y - The y-coordinate of the cell on 2D array board.
     * @param {string} player - The player marking the cell.
     * @param {boolean} [checkIsCellEmpty=true] - Defaults to 'true' and place mark only if the cell is empty. Otherwise, will replace mark on occupied cells. 
     * 
     * @returns {boolean} Returns true if the mark was successfully placed, false otherwise.
     */
    placeMark(x, y, player, checkIsCellEmpty = true) {
        /** 
        * Important Note ! Row is Y axis and Col is X axis 
        * */
        try {
            if (checkIsCellEmpty) {
                if (this.cells[y][x] === null) {
                    this.cells[y][x] = player;
                    this.totalOccupiedCells++;
                    return true;
                }
                return false;
            }
            // No need to check empty cell.
            this.cells[y][x] = player;
            return true;

        } catch (err) { console.log(err); }
    }
    /**
     * 
     * @param {number} x - The x-coordinate of the cell on 2D array board.
     * @param {number} y - The y-coordinate of the cell on 2D array board.
     * @returns {boolean} - boolean
     */
    removeMark(x, y) {
        this.cells[y][x] = null;
        this.totalOccupiedCells--;
        return true;
    }
    /**
     * Getter funcs ==========================================
     * 
     * 
     */
    /**
     * 
     * @returns {Object} a dictionary of number values.
     */
    getSize() {
        return { x: this.xLen, y: this.yLen };
    }
    /**
     * 
     * @returns {number[number[]]} - 2D array of numbers representing cells on board. 
     */
    getCells() {
        return this.cells;
    }
    /**
     * 
     * @returns {number} - number of total occupied cells
     */
    getTotalOccupiedCells() {
        return this.totalOccupiedCells;
    }
}
