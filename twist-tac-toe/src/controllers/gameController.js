import EventHandler from './EventHandler';
import { ele } from '../viewComponents/_htmlElementSelector';
import gameBoardView from '../viewComponents/gameBoardView';

import { game } from "../data/Game";
import { gameConfig } from '../data/GameConfig';
import GameState from "../gameObjects/enums/gameState";
import GameProp from '../gameObjects/enums/gameProp';
import Role from '../gameObjects/enums/role';

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

    const isValidMove = game.playerMakeMove(x, y);
    if (!isValidMove) {
        // TODO: show error invalid move
        console.log('Invalid move at cell', x, y);
        if (game.getGameState() !== GameState.ONGOING) {
            if (game.getGameState() === GameState.FINISHED) {
                alert('Previous game has finished. Please start next game. GameState: ' + game.getGameState());
            }
            else {
                alert('The match has not started yet. Please start the match. GameState: ' + game.getGameState());
            }

        }
        else {
            alert('Invalid move at cell' + x + '-' + y);
        }
    }
    /**
     * Valid play move comes here, above are invalid scenes.
     * 
     */
    else {
        console.log('Validly moved at cell' + x + '-' + y);

        // UPDATE VIEW 
        // for limited pieces game play
        const cell = game.eliminatePreviousMovePiece();
        if (cell) {
            gameBoardView.handleRemoveMark(cell['x'], cell['y']);
        }

        // VIEW UPDATE
        //  //  place mark
        const playerMark = game.getCurrentPlayer().getMark();
        gameBoardView.handlePlaceMark(x, y, playerMark, game.getCurrentPlayer().getTotalMoves());

        //  //  gradient player moves
        const playerMoves = game.getCurrentPlayer().getTotalMoves();
        const numPieces = game.getNumPiecesEachPlayer();
        const earliestMoveIndex = playerMoves > numPieces ? playerMoves - numPieces : 0;
        //  //  get move history
        const history = game.getCurrentPlayer().getMoveHistory().slice(
            earliestMoveIndex,
            playerMoves
        );
        console.log('history: ', history);
        let color;
        let currPlayer = game.getCurrentPlayer().getRole();
        if (currPlayer === Role.P1) {
            color = { r: 78, g: 201, b: 176 };
        }
        else if (currPlayer === Role.P2) {
            color = { r: 218, g: 85, b: 131 };
        }
        const totalPiecesOnBoard = numPieces > playerMoves ? playerMoves : numPieces;
        gameBoardView.addMoveOrderGradient(history, totalPiecesOnBoard, color);

        // DATA UPDATE
        //  //  turn swap happens here
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
// ======================================================================
gameController.on('config-board-size-changed', (x, y) => {

    const updateSuccess = game.updateGameConfig(GameProp.SIZE, { x, y });
    if (updateSuccess) {
        // TODO: REFACTOR
        //  //  update associated vars
        // VIEW UPDATE
        //  //  input
        ele.getInputWinLength().value = game.getWinningLineLength();
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        //  //  board
        gameBoardView.generateBoard(x, y);
        //
        // update game config file
        gameConfig.updateGameConfigData({ boardSizeX: x, boardSizeY: y, winLength: game.getWinningLineLength() });
    }
    else {
        // TODO: REFACTOR
        //  //  update associated vars
        //  //  game win length is calculated and updated according to size of the board.
        const newWinLength = game.getWinningLineLength();
        const newNumPieces = game.getNumPiecesEachPlayer();
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputBoardSizeX().value = game.getBoard().getSize()['x'];
        ele.getInputBoardSizeY().value = game.getBoard().getSize()['y'];
        ele.getInputWinLength().value = newWinLength;
        ele.getInputNumPieces().value = newNumPieces;
        //
        // update game config file
        gameConfig.updateGameConfigData({ boardSizeX: x, boardSizeY: y, winLength: game.getWinningLineLength() });
        //
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        }
        else {
            alert("Please enter a valid board size.");
        }

    }
});
// ======================================================================
gameController.on('config-win-length-changed', (len) => {

    const updateSuccess = game.updateGameConfig(GameProp.WIN_LENGTH, { len });
    if (updateSuccess) {
        // VIEW UPDATE
        // input num pieces
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        // update game config file
        gameConfig.updateGameConfigData({ winLength: len, numPieces: game.getNumPiecesEachPlayer() });
    }
    else {
        // TODO: REFACTOR
        //  //  update associated vars
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputWinLength().value = game.getWinningLineLength();
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        //
        // update game config file
        gameConfig.updateGameConfigData({ winLength: game.getWinningLineLength() });
        //
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        }
        else {
            alert("Win length cannot be longer than any side of the board.")
        }
    }
});
// ======================================================================
gameController.on('config-is-limited-pieces-changed', (isLimited) => {

    const updateSuccess = game.updateGameConfig(GameProp.IS_LIMITED_PIECES, { isLimited });
    if (updateSuccess) {
        // VIEW UPDATE
        //  //  input
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        // update game config file
        gameConfig.updateGameConfigData({ isLimitedPieces: isLimited, numPieces: game.getNumPiecesEachPlayer() });
    }
    else {
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputIsLimitedPieces().checked = game.getIsLimitedPieces();
        //
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        }
        else {
            console.log(isLimited);
            alert("Please enter a valid boolean value.")
        }
    }
});
// ======================================================================
gameController.on('config-num-pieces-changed', (num) => {

    const updateSuccess = game.updateGameConfig(GameProp.NUM_PIECES, { num });
    if (updateSuccess) {
        // update game config file
        gameConfig.updateGameConfigData({ numPieces: num });
    }
    else {
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        //
        // update game config file
        gameConfig.updateGameConfigData({ boardSizeX: x, boardSizeY: y, winLength: game.getWinningLineLength() });
        //
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        }
        else {
            alert("Number of pieces cannot exceed total number of squares on board.")
        }
    }
});
// ======================================================================
gameController.on('config-is-fifo-order-changed', (isFifo) => {

    const updateSuccess = game.updateGameConfig(GameProp.IS_FIFO_ORDER, { isFifo });
    if (updateSuccess) {
        // update game config file
        gameConfig.updateGameConfigData({ isFifoOrder: isFifo });
    }
    else {
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputIsFifoOrder().checked = game.getIsFifoOrder();
        //
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        }
        else {
            alert("Please enter a valid boolean value.")
        }
    }
});

/**
 * match can be started only when game is ready to play. 
 */
// ======================================================================
gameController.on('start-match', () => {
    if (game.getGameState() === GameState.READY) {
        game.startGame();
        alert('Game has started. GameState: ' + game.getGameState())
    }
    else if (game.getGameState() === GameState.FINISHED) {
        alert('Previous game has finished. Please start next game. GameState: ' + game.getGameState());
    }
    else if (game.getGameState() === GameState.ONGOING) {
        alert('Game is already ongoing. GameState: ' + game.getGameState());
    }
    else {
        alert('Game is not ready yet. GameState: ' + game.getGameState());
    }
});

/**
 * Only after previous game is finished, next game can be carried out.
 */
// ======================================================================
gameController.on('next-game', () => {
    if (game.getGameState() === GameState.FINISHED) {
        game.nextGame();
        // Just cleaning the inner text of each cell is valid. 
        // but for simplicity here. I just used generateBoard to clean the board.
        gameBoardView.generateBoard(game.getBoard().getSize()['x'], game.getBoard().getSize()['y']);
        //
        // start game immediately 
        game.startGame();
    }
    else if (game.getGameState() === GameState.ONGOING) {
        alert('Plese finish the ongoing game first. GameState: ' + game.getGameState());
    }
    else {
        alert('Please start the match. GameState: ' + game.getGameState());
    }
});
/**
 * regardless of game state reset-match can be carried out.
 */
// ======================================================================
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