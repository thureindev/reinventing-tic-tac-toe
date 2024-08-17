import { game } from "../../data/Game";
import GameState from "../../gameObjects/enums/gameState";
import Role from "../../gameObjects/enums/role";
import gameBoardView from "../../viewComponents/gameBoardView";

export default function (cell) {
    const { x, y } = cell;
    // make a move in game model and get returned success or failure.
    const isValidMove = game.playerMakeMove(x, y);
    // check failure
    if (!isValidMove) {
        // 
        // Set game state 'FINISHED' for other processes to follow according to this state.
        if (game.getGameState() !== GameState.ONGOING) {
            // TODO: UI stuff should be here. 
            if (game.getGameState() === GameState.FINISHED) {
                alert('Previous game has finished. Please start next game. GameState: ' + game.getGameState());
            } else {
                alert('The match has not started yet. Please start the match. GameState: ' + game.getGameState());
            }
        } else {
            // TODO: error invalid move UI animation should be here.
            alert('Invalid move at cell' + x + '-' + y);
        }
    } else {
        // After valid move, START cell data updates and view updates
        //  //  order is important here. according to how the data is updated in 
        //  //  game object
        //  //  game board object
        //  //  game player object

        //  //  eliminate old pieces for limited pieces gameplay
        if (game.getIsLimitedPieces()) {
            // UPDATE VIEW 
            // for limited pieces game play
            const cell = game.eliminatePreviousMovePiece();
            if (cell) {
                gameBoardView.handleRemoveMark(cell['x'], cell['y']);
            }
        }
        //
        // VIEW UPDATE
        //  //  place mark
        const playerMark = game.getCurrentPlayer().getMark();
        gameBoardView.handlePlaceMark(x, y, playerMark, game.getCurrentPlayer().getTotalMoves());
        //
        //  //  gradient cells for limited pieces gameplay
        if (game.getIsLimitedPieces()) {
            //  //  gradient player moves
            const playerMoves = game.getCurrentPlayer().getTotalMoves();
            const numPieces = game.getNumPiecesEachPlayer();
            const earliestMoveIndex = playerMoves > numPieces ? playerMoves - numPieces : 0;
            //  //  get move history
            const history = game.getCurrentPlayer().getMoveHistory().slice(
                earliestMoveIndex,
                playerMoves
            );
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
        }
        //
        // DATA UPDATE
        //  //  player turn swap happens here
        game.updateGameStateByLastMove(x, y);
        //
        // check game state and show result
        if (game.getGameState() === GameState.FINISHED) {
            if (game.getGameWinner() !== null) {
                // TODO: show winner
                game.getWinningSquaresOnBoard().forEach(cell => {
                    gameBoardView.addClassForUniqueCell(cell['x'], cell['y']);
                });
                // TODO: show winner UI animation here
                alert(game.getCurrentPlayer().getName() + '(' + game.getCurrentPlayer().getMark() + ') wins!\n' + 
                game.getPlayer1().getName() + ' score: (' + game.getPlayer1().getScore() + ') | ' + game.getPlayer2().getName() + ' score: (' + game.getPlayer2().getScore() + ')');
            }
            else {
                // TODO: show draw UI animation here
                alert('Draw! Each player gets (0.5) score\n' + 
                game.getPlayer1().getName() + ' score: (' + game.getPlayer1().getScore() + ') | ' + game.getPlayer2().getName() + ' score: (' + game.getPlayer2().getScore() + ')');
            }
        }
    }
}