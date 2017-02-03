'use strict';

const availableStates = require('./helpers/available-states');
const navigate = require('./helpers/navigate');

describe('each URL should load the corresponding view', function () {
    Object.keys(availableStates).forEach(key => {
        it(key, () => {
            const page = navigate(key);
            availableStates[key].validator(page);
        });
    });
});
