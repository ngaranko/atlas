const availableStates = require('../helpers/available-states');

module.exports = function (state, page) {
    availableStates[state].validator(page);
};
