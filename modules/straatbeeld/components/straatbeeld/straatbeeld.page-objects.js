'use strict';

module.exports = function (pageElement) {
    return {
        get visible () {
            return dp.visible(pageElement);
        }
    };
};
