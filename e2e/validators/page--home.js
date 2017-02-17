'use strict';

const pagePO = require('./page');

module.exports = function (page) {
    expect(page.title).toBe('Home - Atlas');

    expect(page.dashboard.rightColumn.page.homepage.header).toContain('Welkom');

    pagePO(page);
};
