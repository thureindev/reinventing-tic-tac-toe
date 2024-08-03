function checkWinnerSlidingWindow(player, board, rowPos, colPos, winningLineLength) {

    const directions = [
        {dr: 0, dc: 1}, // horizontal line
        {dr: 1, dc: 0}, // vertical line
        {dr: 1, dc: 1}, // diagonal top-left to bottom-right line
        {dr: 1, dc: -1}, // diagonal top-right to bottom-left line
    ]
    const rowMax = board.length;
    const colMax = board[0].length;

    for(const {dr, dc} of directions) {

        let winningLineCounter = 1;

        // for positive direction flow
        for (let i = 1; i < winningLineLength; i ++) {
            const r = dr * i + row;
            const c = dc * i + col;
            if (r < 0 || r >= rowMax || c < 0 || c >=colMax || board[r][c] !== player) break;
            winningLineCounter ++;
        }
        if (winningLineCounter >= winningLineLength) return true;

        // for negative direction flow
        for (let i = 1; i < winningLineLength; i ++) {
            const r = dr * i - row;
            const c = dc * i - col;
            if (r < 0 || r >= rowMax || c < 0 || c >=colMax || board[r][c] !== player) break;
            winningLineCounter ++;
        }
        if (winningLineCounter >= winningLineLength) return true;
    }

    return false;
}