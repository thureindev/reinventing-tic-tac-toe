import EventHandler from "./EventHandler";
import { config } from "../data/GameConfig"
import { ele } from "../viewComponents/_htmlElementSelector";
import gameBoardView from "../viewComponents/gameBoardView";

const configController = new EventHandler();

configController.on('config-board-size-changed', (x, y) => {
    gameBoardView.generateBoard(ele.getGameBoard(), x, y);
});

configController.on('start-match', () => {
    // nth needs to be done right now.
});

configController.on('next-game', () => {
    // Just cleaning the inner text of each cell is valid. 
    // but for simplicity here. I just used generateBoard to clean the board.
    gameBoardView.generateBoard(ele.getGameBoard(), config.boardSizeX, config.boardSizeY);
});

configController.on('reset-match', () => {
    // Just cleaning the inner text of each cell is valid. 
    // but for simplicity here. I just used generateBoard to clean the board.
    gameBoardView.generateBoard(ele.getGameBoard(), config.boardSizeX, config.boardSizeY);
});

export default configController;