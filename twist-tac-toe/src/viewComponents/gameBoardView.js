import '../../styles/dynamic-board.css';
import { ele } from './_htmlElementSelector';
import gameController from "../controllers/gameController";

const gameBoardView = Object.freeze({
    /**
     * 
     * @param {HTMLElement} board 
     * @param {number} size 
     */
    generateBoard: (sizeX = 3, sizeY = 3) => {
        // reset the element
        let html = '';

        /** 
         * Important Note ! Row is Y axis and Col is X axis 
        */
        for (let i = sizeY - 1; i >= 0; i--) {
            // Create a container for each row
            html += `<div class="row" data-row="${i + 1}">`;
            for (let ii = 0; ii < sizeX; ii++) {
                // Add cells to the current row
                html += `
                <div class="cell" data-cell="${ii}-${i}" data-square-name="${ii + 1}${i + 1}">
                </div>`
            }
            // Close the container for the row
            html += `</div>`;
        }
        ele.getGameBoard().innerHTML = html;

        /**
         * 
         * Set CSS variables for rows and columns
         * This one is for dynamic CSS grid.
         * 
         * Important Note ! Row is Y axis and Col is X axis 
         */ 
        ele.getGameBoard().style.setProperty('--rows', sizeY);
        ele.getGameBoard().style.setProperty('--cols', sizeX);

        // Cells
        const cells = document.querySelectorAll('[data-cell]');
        cells.forEach(cell => {
            cell.addEventListener('click', handleClickCell);
        });
        /**
         * 
         * @param {event} e 
         */
        function handleClickCell(e) {
            try {
                const cell = e.target.getAttribute('data-cell');
                const [x, y] = cell.split('-').map(n => Number(n));
                
                // attach event to game controller 
                gameController.emit('clicked-board-cell', x, y);

            } catch (err) { console.log(err); }
        }
    },
    /**
     * =============================================================
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} mark 
     */
    handlePlaceMark: (x, y, mark) => {
        const cell = document.querySelector(`[data-cell="${x}-${y}"]`);
        cell.innerText = mark;
    },
    /**
     * 
     * @param {number} x - x position
     * @param {number} y - y position
     */
    addClassForUniqueCell: (x, y) => {
        const cell = document.querySelector(`[data-cell="${x}-${y}"]`);
        cell.classList.add('win-cell');
    },

});

export default gameBoardView;