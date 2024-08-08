import EventHandler from './EventHandler';
import gameBoardView from '../viewComponents/gameBoardView';
import { game } from "../data/Game";
import GameState from "../gameObjects/enums/gameState";
import configController from "./configController";

const gameController = new EventHandler();

/** 
 * there are ( ) buttons
 * start match
 * next game
 * reset match
 * 
 * clicked-board-cell
 */
gameController.on('clicked-board-cell', (x, y) => {
    const playerMark = game.currentPlayer.mark;

    const isValidMove = game.playerMakeMove(x, y);
    if (!isValidMove) {
        // TODO: show error invalid move
        console.log('Invalid move');
    }
    else {
        // update the view component
        gameBoardView.handlePlaceMark(x, y, playerMark);

        // update the game object
        game.updateGameStateByLastMove(x, y);

        // check game state and show result
        if (game.state === GameState.FINISHED) {
            if (game.winner !== null) {
                // TODO: show winner
                console.log('winner is ', game.currentPlayer.name, '(', game.currentPlayer.mark, ')');
            }
            else {
                // TODO: show draw
                console.log('Draw!');

            }
            console.log(game.player1.name + ' score: ' + game.player1.score + ' | ' + game.player2.name + ' score: ' + game.player2.score);
            console.log('Total Matched Played ' + game.totalMatchesPlayed);
        }
    }
});

gameController.on('config-board-size-changed', (x, y) => {
    game.board.updateSize(x, y);
});

gameController.on('config-winLength-changed', (len) => {
    game.updateWinLength(len);
})

gameController.on('start-match', () => {
    if (game.state === GameState.READY) {
        game.startGame();
    }
});

gameController.on('next-game', () => {
    if (game.state === GameState.FINISHED) {
        game.nextGame();
        configController.emit('next-game');
    }
});

gameController.on('reset-match', () => {
    game.resetMatch();
});

export default gameController;