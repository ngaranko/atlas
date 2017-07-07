'use strict';

module.exports = (label, object) => {
    if (!object) {
        /* eslint-disable no-console, angular/log */
        console.log(label);
        /* eslint-enable no-console, angular/log */
    } else {
        object.then(value => {
            /* eslint-disable no-console, angular/log */
            console.log(`${label}: `, value);
            /* eslint-enable no-console, angular/log */
        });
    }
};
