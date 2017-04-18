'use strict';

const pagePO = require('./page');

module.exports = function (page) {
    expect(page.title).toBe('Home - Dataportaal');

    expect(page.dashboard.rightColumn.page.homepage.map.label).toContain('Data op de kaart');
    expect(page.dashboard.rightColumn.page.homepage.straatbeeld.label).toContain('Panorama');

    pagePO(page);
};
