/*** This approach uses a hardcoded 2D array to find the winning lines 
 * It works fine in 3x3 grid and there shouldn't be much diff in performance.
 * But this solution will become expensive once the grid becomes larger. 
 * So I used another technique. See checkWinnerSlidingWindow. 
 * 
 * 
*/
function checkWinner(board) {
    const winningLines = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningLines) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] !== null &&
            board[a[0]][a[1]].occupiedPlayer === board[b[0]][b[1]].occupiedPlayer &&
            board[a[0]][a[1]].occupiedPlayer === board[c[0]][c[1]].occupiedPlayer) {
            game.roundWinner = board[a[0]][a[1]].occupiedPlayer;
            return true;
        }
    }
    return false;
}
