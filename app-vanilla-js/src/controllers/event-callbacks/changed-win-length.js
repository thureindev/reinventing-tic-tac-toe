import { game } from "../../data/Game";
import { gameConfig } from "../../data/GameConfig";
import GameProp from "../../gameObjects/enums/gameProp";
import { ele } from "../../viewComponents/_htmlElementSelector";

export default function changedWinLength(len) {
    const updateSuccess = game.updateGameConfig(GameProp.WIN_LENGTH, { len });
    if (updateSuccess) {
        // update game config file
        gameConfig.updateGameConfigData({ winLength: len, numPieces: game.getNumPiecesEachPlayer() });
        // VIEW UPDATE
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
    }
    else {
        // update game config file
        gameConfig.updateGameConfigData({ winLength: game.getWinningLineLength() });
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputWinLength().value = game.getWinningLineLength();
        ele.getInputNumPieces().value = game.getNumPiecesEachPlayer();
        // notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        } else {
            alert("Win length cannot be longer than any side of the board.")
        }
    }
}