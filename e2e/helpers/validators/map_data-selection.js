'use strict';

module.exports = function (page) {
    expect(page.title()).toBe('Lijst Vestigingen - Atlas');

    expect(page.dashboard().leftColumn().columnSize()).toBe(0);

    expect(page.dashboard().middleColumn().columnSize()).toBe(4);
    expect(page.dashboard().middleColumn().map().isVisible()).toBe(true);

    expect(page.dashboard().rightColumn().columnSize()).toBe(8);
    expect(page.dashboard().rightColumn().dataSelection().isVisible()).toBe(true);

    expect(page.dashboard().rightColumn().dataSelection().header().title()).toBe('Resultaten');

    expect(page.dashboard().rightColumn().dataSelection().header().tabs(0).label()).toBe('Adressen');
    expect(page.dashboard().rightColumn().dataSelection().header().tabs(0).isActive()).toBe(false);
    expect(page.dashboard().rightColumn().dataSelection().header().tabs(1).label()).toContain('Vestigingen');
    expect(page.dashboard().rightColumn().dataSelection().header().tabs(1).isActive()).toBe(true);

    //expect(page.dashboard().rightColumn().dataSelection().availableFilters()).toBe('ik besta niet?');
};
