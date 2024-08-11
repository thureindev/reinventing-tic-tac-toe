export const gameConfig = {
    boardSizeX: 4,
    boardSizeY: 5,
    winLength: 3,
    isLimitedPieces: true,
    numPieces: 0,
    isFifoOrder: true,
    
    updateGameConfigData: function (updates) {
        Object.assign(this, updates);
    }
}
