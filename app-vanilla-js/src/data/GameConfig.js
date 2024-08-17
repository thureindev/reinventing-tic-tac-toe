export const gameConfig = {
    boardSizeX: 3,
    boardSizeY: 3,
    winLength: 3,
    isLimitedPieces: true,
    numPieces: 3,
    
    updateGameConfigData: function (updates) {
        Object.assign(this, updates);
    }
}
