import { game } from "../../data/Game";
import { JSONToFile } from "../../gameObjects/utils/jsonToFile";
import GameState from "../../gameObjects/enums/gameState";

export default function saveGameResult() {
    if (game.getGameState() === GameState.FINISHED) {
        JSONToFile({
            size: game.board.getSize(),
            winLength: game.getWinningLineLength(),
            isLimitedPieces: game.getIsLimitedPieces(),
            numPieces: game.getNumPiecesEachPlayer(),
            winner: game.getGameWinner().getRole(),
            p1Score: game.getPlayer1().getScore(),
            p2Score: game.getPlayer2().getScore(),
            p1MoveHistory: game.getPlayer1().getMoveHistory(),
            p2MoveHistory: game.getPlayer2().getMoveHistory(),
            totalMatches: game.getTotalGamesPlayedInMatch(),

        }, 'game-result-');
    }
    else {
        alert('There is no game history to save');
    }
}