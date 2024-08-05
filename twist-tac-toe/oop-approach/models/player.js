import Role from '../enums/role.js';
/**
 * Represents a player object
 */
export default class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark; // An img URL or a simple string
        this.role = Role.NONE
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
