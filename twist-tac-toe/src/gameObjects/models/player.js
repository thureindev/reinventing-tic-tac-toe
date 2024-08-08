import Role from '../enums/role.js';
/**
 * Represents a player object
 */
export default class Player {
    constructor(name, mark, role) {
        this.name = name;
        this.mark = mark; // An img URL or a simple string
        this.role = role;
        this.score = 0;
    }
    /**
     * rename player
     */
    rename(newName) {
        this.name = newName;
    }
    /**
     * change player's choice of mark 'X' 'O' or any image url
     */
    changeMark(newMark) {
        this.mark = newMark;
    }
}
