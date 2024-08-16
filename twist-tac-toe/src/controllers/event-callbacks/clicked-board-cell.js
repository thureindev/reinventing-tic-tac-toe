import { game } from "../../data/Game";
import GameState from "../../gameObjects/enums/gameState";
import Role from "../../gameObjects/enums/role";
import gameBoardView from "../../viewComponents/gameBoardView";

export default function (cell) {

    const { x, y } = cell;
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
        gameBoardView.addMoveOrderGradient(history, totalPiecesOnBoard, numPieces, color);

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
}