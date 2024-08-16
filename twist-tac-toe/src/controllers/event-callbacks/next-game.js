import { game } from "../../data/Game";
import GameState from "../../gameObjects/enums/gameState";
import gameBoardView from "../../viewComponents/gameBoardView";

export default function nextGame(){
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
}