import '../styles/style.css'
import { setupGameConfig } from './gameConfig.js';
import { setupGameBoard } from './gameBoard.js';
import { config } from './dataGameConfig.js';

document.querySelector('#app').innerHTML = `
    <div class="container">
        
        <div class="game-settings" id="game-config"></div>

        <div class="board" id="game-board"></div>
    </div>
`

setupGameConfig(document.querySelector('#game-config'));
setupGameBoard(document.querySelector('#game-board'), config.boardSize);
