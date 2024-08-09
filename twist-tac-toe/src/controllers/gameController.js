import EventHandler from './EventHandler';
import { ele } from '../viewComponents/_htmlElementSelector';
import gameBoardView from '../viewComponents/gameBoardView';

import { game } from "../data/Game";
import GameState from "../gameObjects/enums/gameState";
import { config } from '../data/GameConfig';

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
    const playerMark = game.getCurrentPlayer().getMark();

    const isValidMove = game.playerMakeMove(x, y);
    if (!isValidMove) {
        // TODO: show error invalid move
        console.log('Invalid move at cell', x, y);
        if (game.getGameState() !== GameState.ONGOING) {
            alert('The game has not started yet. Please start the match. GameState: ' + game.getGameState());
        }
        else {
            alert('Invalid move at cell' + x + '-' + y);
        }
    }
    else {
        console.log('Validly moved at cell' + x + '-' + y);
        // update the view component
        gameBoardView.handlePlaceMark(x, y, playerMark);

        // update the game object
        game.updateGameStateByLastMove(x, y);

        // check game state and show result
        if (game.getGameState() === GameState.FINISHED) {
            if (game.getGameWinner !== null) {
                // TODO: show winner
                game.getWinningSquaresOnBoard().forEach(cell => {
                    gameBoardView.addClassForUniqueCell(cell['x'], cell['y']);
                });

                // del later
                alert('winner is ' + game.getCurrentPlayer().getName() + '(' + game.getCurrentPlayer().getMark() + ')\n' + game.getPlayer1().getName() + ' score: (' + game.getPlayer1().getScore() + ') | ' + game.getPlayer2().getName() + ' score: (' + game.getPlayer2().getScore() + ')')
            }
            else {
                // TODO: show draw

                // del later
                alert('Draw!')
            }
            // del later
            console.log(game.getPlayer1().getName() + ' score: (' + game.getPlayer1().getScore() + ') | ' + game.getPlayer2().getName() + ' score: (' + game.getPlayer2().getScore() + ')');
            console.log('Total Matched Played (' + game.getGamesPlayedInMatch() + ')');
        }
    }
});

gameController.on('config-board-size-changed', (x, y) => {
    if (game.getGameState() !== GameState.ONGOING && game.getGamesPlayedInMatch() <= 0) {
        // update data
        game.getBoard().updateSize(x, y);
        config.boardSizeX = x;
        config.boardSizeY = y;
        // update view
        gameBoardView.generateBoard(x, y);
        // TODO: notify user
        //

        // check the appropriate winLength
        if (x < config.winLength || y < config.winLength) {
            const newWinLength = x < y ? x : y;
            // data
            game.updateWinLength(newWinLength);
            config.winLength = newWinLength;
            // update view
            ele.getInputWinLength().value = newWinLength;
            // TODO: notify user
            console.log("win-length adjusted to fit within board");
        }
    }
    else {
        ele.getInputBoardSizeX().value = config.boardSizeX;
        ele.getInputBoardSizeY().value = config.boardSizeY;
        alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
    }
});

gameController.on('config-win-length-changed', (len) => {
    // ensure winLength will not be changed during a match
    if (game.getGameState() !== GameState.ONGOING && game.getGamesPlayedInMatch() <= 0) {
        // check the appropriate winLength
        if (config.boardSizeX >= len || config.boardSizeY >= len) {
            config.winLength = len;
            game.updateWinLength(len);
        }
        else {
            ele.getInputWinLength().value = config.winLength;
            alert("Win-length cannot be longer than any side of the board.");
        }
    }
    else {
        ele.getInputWinLength().value = config.winLength;
        alert("Cannot change game configs while playing. Reset match if you want to play with new configs.");
    }
});

gameController.on('config-num-pieces-changed', (num) => {
    if (game.getGameState() !== GameState.ONGOING && game.getGamesPlayedInMatch() <= 0) {
        config.numPieces = num;
        // TODO: update game object
    }
    else {
        ele.getInputNumPieces().value = config.numPieces;
        alert("Cannot change game configs while playing. Reset match if you want to play with new configs.")
    }
});

gameController.on('config-fifo-order-changed', (isFifo) => {
    if (game.getGameState() !== GameState.ONGOING && game.getGamesPlayedInMatch() <= 0) {
        config.fifoOrder = isFifo;
        // TODO: update game object
    }
    else {
        ele.getInputFifoOrder().value = config.fifoOrder;
        alert("Cannot change game configs while playing. Reset match if you want to play with new configs.")
    }
});

/**
 * match can be started only when game is ready to play. 
 */
gameController.on('start-match', () => {
    if (game.getGameState() === GameState.READY) {
        game.startGame();
        alert('Game has started. GameState: ' + game.getGameState())
    }
    else {
        alert('Game is not ready yet. GameState: ' + game.getGameState());
    }
});

/**
 * Only after previous game is finished, next game can be carried out.
 */
gameController.on('next-game', () => {
    if (game.getGameState() === GameState.FINISHED) {
        game.nextGame();
        // Just cleaning the inner text of each cell is valid. 
        // but for simplicity here. I just used generateBoard to clean the board.
        gameBoardView.generateBoard(game.getBoard().getSize()['x'], game.getBoard().getSize()['y']);
    }
    else if (game.getGameState() === GameState.ONGOING) {
        alert('Plese finish this game first.. GameState: ' + game.getGameState());
    }
    else {
        alert('Please start the match. GameState: ' + game.getGameState());
    }
});

/**
 * regardless of game state reset-match can be carried out.
 */
gameController.on('reset-match', () => {
    const confirmed = confirm('The scores will be reset. Are you sure you want to reset the match?');
    if (confirmed) {
        game.resetMatch();
        // Just cleaning the inner text of each cell is valid. 
        // but for simplicity here. I just used generateBoard to clean the board.
        gameBoardView.generateBoard(game.getBoard().getSize()['x'], game.getBoard().getSize()['y']);

        // del later
        alert('Match reset. GameState: ' + game.getGameState());
    }
});

export default gameController;