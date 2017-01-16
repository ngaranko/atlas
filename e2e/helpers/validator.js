const availableStates = require('./available-states');

module.exports = function (state, page) {
    availableStates[state].validator(page);
};
