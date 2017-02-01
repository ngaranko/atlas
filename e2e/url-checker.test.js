'use strict';

const availableStates = require('./helpers/available-states');
const navigate = require('./helpers/navigate');

describe('each URL should load the corresponding view', function () {
    const AVAILABLE_STATE_KEYS = Object.keys(availableStates);
    let page;

    AVAILABLE_STATE_KEYS.forEach(key => {
        it(key, () => {
            page = navigate(key);
            availableStates[key].validator(page);
        });
    });
});
