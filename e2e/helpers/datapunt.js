'use strict';

module.exports = {
    availableStates: require('./available-states'),
    hasClass: require('./has-class'),
    isVisible: require('./is-visible'),
    require: function (absolutePath) {
        return require('../../' + absolutePath);
    }
};
