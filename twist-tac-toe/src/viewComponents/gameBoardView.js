import '../../styles/dynamic-board.css';
import gameController from "../controllers/gameController";

const gameBoardView = Object.freeze({
    /**
     * 
     * @param {HTMLElement} board 
     * @param {number} size 
     */
    generateBoard: (board, sizeX = 3, sizeY = 3) => {
        let html = '';
        for (let i = 0; i < sizeX; i++) {
            // Create a container for each row
            html += `<div class="row" data-row="${i + 1}">`;
            for (let ii = 0; ii < sizeY; ii++) {
                // Add cells to the current row
                html += `<div class="cell" data-cell="${i}-${ii}"></div>`
            }
            // Close the container for the row
            html += `</div>`;
        }
        board.innerHTML = html;

        // Set CSS variables for rows and columns
        board.style.setProperty('--rows', sizeX);
        board.style.setProperty('--cols', sizeY);

        // Cells
        const cells = document.querySelectorAll('[data-cell]');
        cells.forEach(cell => {
            cell.addEventListener('click', handleClickCell);
        });
        function handleClickCell(e) {
            try {
                const cell = e.target.getAttribute('data-cell');
                const [x, y] = cell.split('-').map(n => Number(n));
                gameController.emit('clicked-board-cell', x, y);

            } catch (err) { console.log(err); }
        }
    },

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @param {string} mark 
     */
    handlePlaceMark: (row, col, mark) => {
        const cell = document.querySelector(`[data-cell="${row}-${col}"]`);

        cell.innerText = mark;
    }
});

export default gameBoardView;