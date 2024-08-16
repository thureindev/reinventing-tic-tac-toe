import { game } from "../../data/Game";
import { gameConfig } from "../../data/GameConfig";
import GameProp from "../../gameObjects/enums/gameProp";
import { ele } from "../../viewComponents/_htmlElementSelector";

export default function changedNumPieces(num) {

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
}