function DdiyException(value, message) {
    this.value = value;
    this.message = message;
    this.toString = function () {
        return `${this.value}: ${this.message}`;
    };
}

module.exports = {
    DdiyException
};