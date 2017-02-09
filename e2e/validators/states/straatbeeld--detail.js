'use strict';

const straatbeeld = require('./straatbeeld');

module.exports = function (page) {
    expect(page.title).toBe('Panorama 123357.48, 486232.84 (52.3630724, 4.9226576) - Atlas');

    straatbeeld(page);
};
