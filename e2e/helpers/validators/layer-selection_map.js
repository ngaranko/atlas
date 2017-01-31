'use strict';

const mapValidator = require('./map');

module.exports = function (page) {
    expect(page.title()).toBe('Selecteer kaartlagen - Atlas');

    expect(page.dashboard().leftColumn().columnSize()).toBe(4);
    expect(page.dashboard().leftColumn().layerSelection().isVisible()).toBe(true);

    expect(page.dashboard().leftColumn().layerSelection().baselayers().header()).toBe('Achtergrond');
    expect(page.dashboard().leftColumn().layerSelection().baselayers().options(0).label()).toBe('Topografie');
    expect(page.dashboard().leftColumn().layerSelection().baselayers().options(1).label()).toBe('Luchtfoto 2016');

    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).header()).toBe('Economie');
    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).options(0).label()).toBe('Bouw');
    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).options(1).label()).toBe('Cultuur, sport, recreatie');

    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).header()).toBe('Onroerende zaken');
    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).options(0).label()).toBe('Burgerlijke gemeenten');
    expect(page.dashboard().leftColumn().layerSelection().overlays().categories(0).options(1).label()).toBe('Kadastrale gemeenten');

    expect(page.dashboard().middleColumn().columnSize()).toBe(8);
    expect(page.dashboard().middleColumn().map().isVisible()).toBe(true);

    mapValidator(page);
};
