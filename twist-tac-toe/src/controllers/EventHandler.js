export default function EventHandler() {
    this.events = {};
}

EventHandler.prototype.on = function (event, listener) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(listener);
};

EventHandler.prototype.emit = function (event, ...args) {
    if (this.events[event]) {
        this.events[event].forEach(listener => listener(...args));
    }
};