// board.js

import { Player } from './player.js';

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

function resetBoard() {
    board = board.map(row => row.map(cell => ({
        ...cell,
        occupiedPlayer: Player.NONE
    })));
}

function isValidMove(row, col) {
    return board[row][col].occupiedPlayer === Player.NONE;
}

function playMove(player, row, col) {
    if (isValidMove(row, col)) {
        board[row][col].occupiedPlayer = player;
        return true;
    }
    return false;
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
        if (board[a[0]][a[1]].occupiedPlayer !== Player.NONE &&
            board[a[0]][a[1]].occupiedPlayer === board[b[0]][b[1]].occupiedPlayer &&
            board[a[0]][a[1]].occupiedPlayer === board[c[0]][c[1]].occupiedPlayer) {
            return board[a[0]][a[1]].occupiedPlayer;
        }
    }
    return Player.NONE;
}

export { board, resetBoard, playMove, checkWinner, isValidMove };
