import { game } from "../../data/Game";
import { gameConfig } from "../../data/GameConfig";
import GameProp from "../../gameObjects/enums/gameProp";
import { ele } from "../../viewComponents/_htmlElementSelector";

export default function changedIsLimitedPieces(isLimited) {
    const updateSuccess = game.updateGameConfig(GameProp.IS_LIMITED_PIECES, { isLimited });
    if (updateSuccess) {
        // update game config file
        gameConfig.updateGameConfigData({ isLimitedPieces: isLimited, numPieces: game.getNumPiecesEachPlayer() });
    }
    else {
        // VIEW UPDATE
        //  //  reset the changed values in view to previous data in game object. 
        ele.getInputIsLimitedPieces().checked = game.getIsLimitedPieces();
        // TODO: notify user
        if (game.isDuringMatch()) {
            alert("Cannot change board size while playing. Reset match if you want to play with new configs.")
        } else {
            console.log(isLimited);
            alert("Please enter a valid boolean value.")
        }
    }
}