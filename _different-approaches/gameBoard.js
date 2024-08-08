/**
 * 
 * @param {HTMLElement} board 
 * @param {number} size 
 */
export function generateBoard(board, size = 3) {
    let html = '';
    for (let i = 0; i < size; i++) {
        for (let ii = 0; ii < size; ii++) {
            html += `
            <div class="cell" data-cell></div>
            `
        }
    }
    board.innerHTML = html;

    const cells = document.querySelectorAll('[data-cell]');
    let currentTurn = 'X';

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    /**
     * 
     * @param {Event} e 
     */
    function handleClick(e) {
        const cell = e.target;
        if (isEmptyCell(cell)) {
            cell.innerText = currentTurn;
            swapTurns();
        }
        else {
            // show error
            console.log('cell not empty');
        }

        function swapTurns() {
            // Swap turn between 'X' and 'O'
            currentTurn = currentTurn === 'X' ? 'O' : 'X';
        }
        function isEmptyCell(cell) {
            return cell.innerText === '' ? true : false;
        }
    }
}