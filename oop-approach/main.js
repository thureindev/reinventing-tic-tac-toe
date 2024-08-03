// main.js

import { player1, player2 } from './player.js';
import { game, GameState, startRound, startMatch, makeMove } from './game.js';

startMatch();
game.state = GameState.ONGOING;
makeMove(player1.player, 0, 0); // Player 1 places a mark at (0, 0)
makeMove(player2.player, 1, 1); // Player 2 places a mark at (1, 1)
