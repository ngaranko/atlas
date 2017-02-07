'use strict';

const availableStates = require('./helpers/available-states');

describe('each URL should load the corresponding view', function () {
    Object.keys(availableStates).forEach(key => {
        it(key, () => {
            const page = dp.navigate(key);

            availableStates[key].validator(page);
        });
    });
});
