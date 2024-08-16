import { game } from "../../data/Game";
import GameState from "../../gameObjects/enums/gameState";

export default function startMatch() {
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
}