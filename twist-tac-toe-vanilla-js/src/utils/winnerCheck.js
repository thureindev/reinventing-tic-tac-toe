import Board from "../gameObjects/models/board";
import Player from "../gameObjects/models/player";

/**
 * Important Note ! Row is Y axis and Col is X axis 
 * 
 * @param {Board} board 
 * @param {Player} player 
 * @param {number} rowPos 
 * @param {number} colPos 
 * @param {number} winLength 
 * 
 * @returns {Object[] || boolean} - returns array of objects or false
 * @example [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}]
 */
export function winnerCheckingSlidingWindow(board, player, colPos, rowPos, winLength) {
    const directionOffsets = [
        { dr: 0, dc: 1 },  // Horizontal
        { dr: 1, dc: 0 },  // Vertical
        { dr: 1, dc: 1 },  // Diagonal top-left to bottom-right
        { dr: 1, dc: -1 }  // Diagonal top-right to bottom-left
    ];
    const rowMax = board.length;
    const colMax = board[0].length;
    const winningCells = [];

    for (const { dr, dc } of directionOffsets) {
        let count = 1;

        // Check in the positive direction
        for (let i = 1; i < winLength; i++) {
            const r = rowPos + dr * i;
            const c = colPos + dc * i;
            if (r < 0 || r >= rowMax || c < 0 || c >= colMax || board[r][c] !== player) break;
            count++;
            winningCells.push({ x: c, y: r });
        }

        // Check in the negative direction
        for (let i = 1; i < winLength; i++) {
            const r = rowPos - dr * i;
            const c = colPos - dc * i;
            if (r < 0 || r >= rowMax || c < 0 || c >= colMax || board[r][c] !== player) break;
            count++;
            winningCells.push({ x: c, y: r });
        }

        // Include the played square itself in winning cells
        if (count >= winLength) {
            winningCells.push({ x: colPos, y: rowPos });
            return winningCells;
        }
    }

    return false;
}
