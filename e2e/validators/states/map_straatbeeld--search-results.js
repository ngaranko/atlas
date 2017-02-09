'use strict';

const mapStraatbeeld = require('./map_straatbeeld');

module.exports = function (page) {
    expect(page.title).toBe('Panorama 121356.94, 487341.61 (52.3729183, 4.8931775) - Atlas');

    mapStraatbeeld(page);
};
