import '../styles/style.css'
import { ele } from './viewComponents/_htmlElementSelector.js';
import { config } from './data/GameConfig.js';
import gameBoardView from './viewComponents/gameBoardView.js';
import gameConfigView from './viewComponents/gameConfigView.js';

document.querySelector('#app').innerHTML = `
    <div class="container">
        
        <div class="game-config" id="game-config"></div>

        <div class="game-board" id="game-board"></div>
    </div>
`

gameConfigView.setupGameConfig(ele.getGameConfig());
gameBoardView.generateBoard(ele.getGameBoard(), config.boardSize);
