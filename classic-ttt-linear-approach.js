// Enumerations for state and winner
const GameState = Object.freeze({
    PREPARING: 'preparing',
    READY: 'ready',
    ONGOING: 'ongoing',
    FINISHED: 'finished'
});

const Player = Object.freeze({
    P1: 'p1',
    P2: 'p2',
    NONE: null
});

const player1 = {
    name: 'Player 1',
    player: Player.P1,
    mark_img: 'X' // This will be an image URL in a real game
};

const player2 = {
    name: 'Player 2',
    player: Player.P2,
    mark_img: 'O' // This will be an image URL in a real game
};

let board = [
    [{ name: 'top_left', occupiedPlayer: Player.NONE },
     { name: 'top_mid', occupiedPlayer: Player.NONE },
     { name: 'top_right', occupiedPlayer: Player.NONE }],
    
    [{ name: 'mid_left', occupiedPlayer: Player.NONE },
     { name: 'mid_mid', occupiedPlayer: Player.NONE },
     { name: 'mid_right', occupiedPlayer: Player.NONE }],
    
    [{ name: 'bot_left', occupiedPlayer: Player.NONE },
     { name: 'bot_mid', occupiedPlayer: Player.NONE },
     { name: 'bot_right', occupiedPlayer: Player.NONE }]
];

const game = {
    state: GameState.PREPARING, // can be 'preparing', 'ready', 'ongoing', 'finished'
    roundScore: {
        p1_score: 0,
        p2_score: 0
    },
    roundWinner: Player.NONE, // can be 'p1', 'p2', 'none'
    matchScore: {
        p1_score: 0,
        p2_score: 0
    },
    matchWinner: Player.NONE, // can be 'p1', 'p2', 'none'
};

function resetBoard() {
    board = board.map(row => row.map(cell => ({
        ...cell,
        occupiedPlayer: null
    })))
}

function resetRound() {
    game.state = GameState.PREPARING;
    game.winner = Player.NONE;
    game.roundScore.p1_score = 0;
    game.roundScore.p2_score = 0;
    resetBoard();
}

function startRound() {
    resetRound();
    game.state = GameState.READY;
    // More logic to transition to 'ongoing' when players are ready
}

function resetMatch() {
    resetRound();
    game.matchScore.p1_score = 0;
    game.matchScore.p2_score = 0;
}

function startMatch() {
    resetRound();
    game.state = GameState.READY;
    // More logic to transition to 'ongoing' when players are ready
}

function checkWinner() {
    const winningCombinations = [
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] !== Player.NONE &&
            board[a[0]][a[1]].occupiedPlayer === board[b[0]][b[1]].occupiedPlayer &&
            board[a[0]][a[1]].occupiedPlayer === board[c[0]][c[1]].occupiedPlayer) {
            game.roundWinner = board[a[0]][a[1]].occupiedPlayer;
            return true;
        }
    }
    return false;
}

function isValidMove(row, col) {
    return !board[row][col].occupied_status;
}

function playMove(player, row, col) {
    if (game.state !== 'ongoing') return;
    if (!isValidMove(row, col)) return;

    board[row][col].occupiedPlayer = player;

    if (checkWinner()) {
        console.log(`${player} wins!`);
        game.state = 'finished';
        if (player === 'p1') {
            game.roundScore.p1_score++;
            game.matchScore.p1_score++;
        } else {
            game.roundScore.p2_score++;
            game.matchScore.p2_score++;
        }
    } else {
        // Swap turns or handle next move
    }
}

/*** need to do swapTurns
 * need to check full board
 * need to have move counter for three piece game
 * 
 * 
*/

/*** Usage
 * 
 */
// startGame();
// game.state = 'ongoing';
// playMove('p1', 0, 0); // P1 marked at (0, 0)
// playMove('p2', 1, 1); // P2 marked at (1, 1)
