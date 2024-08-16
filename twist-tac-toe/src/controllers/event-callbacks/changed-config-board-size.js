import { game } from "../../data/Game";
import { gameConfig } from "../../data/GameConfig";
import GameProp from "../../gameObjects/enums/gameProp";
import { ele } from "../../viewComponents/_htmlElementSelector";
import gameBoardView from "../../viewComponents/gameBoardView";


export default function changedBoardSize(cell) {

    const { x, y } = cell;
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
}