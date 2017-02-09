'use strict';

const straatbeeld = require('./straatbeeld');

module.exports = function (page) {
    expect(page.title).toBe('Panorama 128708.98, 485100.65 (52.3531791, 5.0013100) - Atlas');

    straatbeeld(page);
};
