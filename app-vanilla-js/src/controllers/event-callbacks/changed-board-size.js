import { game } from "../../data/Game";
import { gameConfig } from "../../data/GameConfig";
import GameProp from "../../gameObjects/enums/gameProp";
import { ele } from "../../viewComponents/_htmlElementSelector";
import gameBoardView from "../../viewComponents/gameBoardView";

export default function changedBoardSize(cell) {
    const { x, y } = cell;
    const updateSuccess = game.updateGameConfig(GameProp.SIZE, { x, y });
    if (updateSuccess) {
        // update game config file
        gameConfig.updateGameConfigData({ boardSizeX: x, boardSizeY: y, winLength: game.getWinningLineLength() });
        // VIEW UPDATE
        ele.getInputWinLength().value = game.getWinningLineLength();
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        // reset board
        //  //  a new clean board is generated
        gameBoardView.generateBoard(x, y);
    }
    else {
        //  //  game win length is calculated and updated according to size of the board.
        const newWinLength = game.getWinningLineLength();
        const newNumPieces = game.getNumPiecesEachPlayer();
        // update game config file
        gameConfig.updateGameConfigData({ boardSizeX: x, boardSizeY: y, winLength: game.getWinningLineLength() });
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputBoardSizeX().value = game.getBoard().getSize()['x'];
        ele.getInputBoardSizeY().value = game.getBoard().getSize()['y'];
        ele.getInputWinLength().value = newWinLength;
        ele.getInputNumPieces().value = newNumPieces;
        // notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        } else {
            alert("Please enter a valid board size.");
        }

    }
}