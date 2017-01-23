'use strict';

module.exports = function (page) {
    expect(page.dashboard().rightColumn().columnSize()).toBe(12);
    expect(page.dashboard().rightColumn().dataSelection().isVisible()).toBe(true);
};
