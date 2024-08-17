import { game } from "../../data/Game";
import gameBoardView from "../../viewComponents/gameBoardView";

export default function resetMatch() {
    const confirmed = confirm('The scores will be reset. Are you sure you want to reset the match?');
    if (confirmed) {
        game.resetMatch();
        // Just cleaning the inner text of each cell is valid. 
        // but for simplicity here. I just used generateBoard to clean the board.
        gameBoardView.generateBoard(game.getBoard().getSize()['x'], game.getBoard().getSize()['y']);

        // del later
        alert('Match reset. GameState: ' + game.getGameState());
    }
}