import EventHandler from './EventHandler';
import _func from './event-callbacks/_func';

const gameController = new EventHandler();

// VALUE CHANGE EVENTS
gameController.on('clicked-board-cell', (cell) => _func.clickedBoardCell(cell));
gameController.on('changed-board-size', (cell) => _func.changedBoardSize(cell));
gameController.on('changed-win-length', (len) => _func.changedWinLength(len));
gameController.on('changed-is-limited-pieces', (isLimited) => _func.changedIsLimitedPieces(isLimited));
gameController.on('changed-num-pieces', (num) => _func.changedNumPieces(num));

// MATCH RELATED EVENTS
//  //  match can be started only when game is ready to play. 
gameController.on('start-match', () => _func.startMatch());
//  //  Only after previous game is finished, next game can be carried out. 
gameController.on('next-game', () => _func.nextGame());
//  //  regardless of game state reset-match can be carried out. 
gameController.on('reset-match', () => _func.resetMatch());
//
// SAVE GAME HISTORY EVENT
gameController.on('save-game-result', () => _func.saveGameResult());

export default gameController;