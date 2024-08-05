export function winnerCheckingSlidingWindow(board, player, rowPos, colPos, winLength) {
    const directionOffsets = [
        { dr: 0, dc: 1 },  // Horizontal
        { dr: 1, dc: 0 },  // Vertical
        { dr: 1, dc: 1 },  // Diagonal top-left to bottom-right
        { dr: 1, dc: -1 }  // Diagonal top-right to bottom-left
    ];
    const rowMax = board.length;
    const colMax = board[0].length;

    for (const { dr, dc } of directionOffsets) {
        let count = 1;

        // Check in the positive direction
        for (let i = 1; i < winLength; i++) {
            const r = rowPos + dr * i;
            const c = colPos + dc * i;
            if (r < 0 || r >= rowMax || c < 0 || c >= colMax || board[r][c] !== player) break;
            count++;
        }

        // Check in the negative direction
        for (let i = 1; i < winLength; i++) {
            const r = rowPos - dr * i;
            const c = colPos - dc * i;
            if (r < 0 || r >= rowMax || c < 0 || c >= colMax || board[r][c] !== player) break;
            count++;
        }

        if (count >= winLength) return true;
    }

    return false;
}
