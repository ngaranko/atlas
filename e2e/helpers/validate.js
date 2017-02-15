'use strict';

const availableStates = require('./available-states');

module.exports = function (pageName, page) {
    availableStates[pageName].validator(page);
};
