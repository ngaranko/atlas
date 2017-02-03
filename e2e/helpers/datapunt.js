'use strict';

module.exports = {
    require: function (absolutePath) {
        return require('../../' + absolutePath);
    }
};
