'use strict';

const pagePO = require('./page');

module.exports = function (page) {
    expect(page.title).toBe('Inloggen - Atlas');

    pagePO(page);
};
