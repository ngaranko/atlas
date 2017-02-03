'use strict';

module.exports = function (page) {
    expect(page.title).toBe('Panorama 123357.48, 486232.84 (52.3630724, 4.9226576) - Atlas');

    expect(page.dashboard.leftColumn.columnSize).toBe(0);
    expect(page.dashboard.middleColumn.columnSize).toBe(0);

    expect(page.dashboard.rightColumn.columnSize).toBe(12);
    expect(page.dashboard.rightColumn.straatbeeld.isVisible).toBe(true);
};
