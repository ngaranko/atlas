'use strict';

/**
 *
 * @description this function receives a with a text value and returns a number value
 */
module.exports = text => {
    if (text) {
        return text.then(value => {
            value = parseFloat(value.replace('.', '').replace(',', '.'));

            if (!isNaN(value)) {
                return value;
            } else {
                return null;
            }
        });
    } else {
        return null;
    }
};
