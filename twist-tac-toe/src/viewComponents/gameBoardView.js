import '../../styles/dynamic-board.css';
import { ele } from './_htmlElementSelector';
import gameController from "../controllers/gameController";
import { generateSquareName } from '../gameObjects/utils/generateSquareName';

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
                <div class="cell" data-cell="${ii}-${i}">
                    <span class="square-name" data-square-name="${ii + 1}-${i + 1}">
                        ${generateSquareName(i, ii)}
                    </span>

                    <span class="mark"></span>

                    <span class="move-order"></span>
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
                gameController.emit('clicked-board-cell', { x, y });

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
    handlePlaceMark: (x, y, mark, order) => {
        const cellMark = ele.getCellChildMark(x, y);
        cellMark.innerText = mark;

        const cellMoveOrder = ele.getCellChildMoveOrder(x, y);
        cellMoveOrder.innerText = order;
    },
    handleRemoveMark: (x, y) => {
        const cellMark = ele.getCellChildMark(x, y);
        cellMark.innerText = '';

        const cellMoveOrder = ele.getCellChildMoveOrder(x, y);
        cellMoveOrder.innerText = '';

        const cell = ele.getCellOnBoard(x, y);
        // CSS stylize update // reset to default empty cell
        cell.style.setProperty('background-color', 'var(--board-bg-color)');

        cellMark.style.setProperty('color', 'var(--main-color)');
        cellMoveOrder.style.setProperty('color', 'var(--main-color)');
    },
    addMoveOrderGradient: (moveHistory, totalPiecesOnBoard, numPieces, color) => {
        let i = 1, seg = 0.8 / totalPiecesOnBoard;

        for (const { x, y } of moveHistory) {
            const cell = ele.getCellOnBoard(x, y);
            // CSS stylize update
            // cell.style.setProperty('background-color', `rgba(${color['r']}, ${color['g']}, ${color['b']}, ${i * seg})`);
            // cell.style.setProperty('color', 'var(--cell-gradient-overlay-color)');

            const cellMoveOrder = ele.getCellChildMoveOrder(x, y);
            cellMoveOrder.style.setProperty('color', `rgba(${color['r']}, ${color['g']}, ${color['b']}, 1)`);

            const cellMark = ele.getCellChildMark(x, y);
            cellMark.style.setProperty('color', `rgba(${color['r']}, ${color['g']}, ${color['b']}, 1)`);

            i++;
        }
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