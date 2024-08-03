// player.js

const Player = Object.freeze({
    P1: 'p1',
    P2: 'p2',
    NONE: null
});

const player1 = {
    name: 'Player 1',
    player: Player.P1,
    mark_img: 'X' // This will be an image URL in a real game
};

const player2 = {
    name: 'Player 2',
    player: Player.P2,
    mark_img: 'O' // This will be an image URL in a real game
};

export { Player, player1, player2 };
