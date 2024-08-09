export const ele = Object.freeze({
    getGameBoard: () => document.getElementById('game-board'),
    getGameConfig: () => document.getElementById('game-config'),
    getInputBoardSizeX: () => document.getElementById('board-size-x'),
    getInputBoardSizeY: () => document.getElementById('board-size-y'),
    getInputWinLength: () => document.getElementById('win-length'),
    getInputNumPieces: () => document.getElementById('num-pieces'),
    getInputFifoOrder: () => document.getElementById('fifo-order'),
});