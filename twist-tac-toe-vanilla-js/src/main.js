import '../styles/style.css'
import { gameConfig } from './data/GameConfig.js';
import gameBoardView from './viewComponents/gameBoardView.js';
import gameConfigView from './viewComponents/gameConfigView.js';

document.querySelector('#app').innerHTML = `
    <div class="container">
        <div class="game-config" id="game-config"></div>
        <div class="game-board" id="game-board"></div>
    </div>
`

gameConfigView.setupGameConfigView(gameConfig);
gameBoardView.generateBoard(gameConfig.boardSizeX, gameConfig.boardSizeY);
