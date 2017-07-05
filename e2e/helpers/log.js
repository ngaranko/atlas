'use strict';

module.exports = (label, object) => {
    if (!object) {
        /* eslint-disable no-console, angular/log */
        console.log(label);
        /* eslint-emable no-console, angular/log */
    } else {
        object.then(value => {
            /* eslint-disable no-console, angular/log */
            console.log(`${label}: `, value);
            /* eslint-emable no-console, angular/log */
        });
    }
};
