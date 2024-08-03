// game.js

import { Player } from './player.js';
import { board, resetBoard, playMove, checkWinner } from './board.js';

const GameState = Object.freeze({
    PREPARING: 'preparing',
    READY: 'ready',
    ONGOING: 'ongoing',
    FINISHED: 'finished'
});

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

function resetRound() {
    game.state = GameState.PREPARING;
    game.roundWinner = Player.NONE;
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

function makeMove(player, row, col) {
    if (game.state !== GameState.ONGOING) return;
    if (!playMove(player, row, col)) return;

    const winner = checkWinner();
    if (winner !== Player.NONE) {
        console.log(`${player} wins!`);
        game.state = GameState.FINISHED;
        game.roundWinner = winner;
        if (winner === Player.P1) {
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

export { game, GameState, startRound, startMatch, makeMove, resetRound, resetMatch };
