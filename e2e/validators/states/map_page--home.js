'use strict';

const mapPage = require('./map_page');

module.exports = function (page) {
    expect(page.title).toBe('Home - Atlas');

    expect(page.dashboard.rightColumn.page.text).toContain('applicatie van de gemeente Amsterdam');

    mapPage(page);
};
