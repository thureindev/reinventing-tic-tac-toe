export const ele = Object.freeze({
    getGameBoard: () => document.getElementById('game-board'),
    getGameConfig: () => document.getElementById('game-config'),

    getInputBoardSizeX: () => document.getElementById('board-size-x'),
    getInputBoardSizeY: () => document.getElementById('board-size-y'),
    getInputWinLength: () => document.getElementById('win-length'),
    getInputIsLimitedPieces: () => document.getElementById('is-limited-pieces'),
    getInputNumPieces: () => document.getElementById('num-pieces'),
    getInputIsFifoOrder: () => document.getElementById('is-fifo-order'),

    getBtnStartMatch: () => document.getElementById('start-match'),
    getBtnNextGame: () => document.getElementById('next-game'),
    getBtnResetMatch: () => document.getElementById('reset-match'),

});