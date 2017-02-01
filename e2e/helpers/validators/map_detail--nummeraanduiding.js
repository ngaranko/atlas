'use strict';

const mapDetailValidator = require('./map_detail');

module.exports = function (page) {
    expect(page.title()).toBe('Adres: Maria Austriastraat 730 - Atlas');

    expect(page.dashboard().rightColumn().detail().nummeraanduiding().nummeraanduidingHeader().stelselpediaHeader().title()).toBe('Maria Austriastraat 730');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().nummeraanduidingHeader().stelselpediaHeader().subtitle()).toBe('Adres');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(0)).toBe('Naam openbare ruimte');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(0)).toBe('Maria Austriastraat');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(1)).toBe('Huisnummer');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(1)).toBe('730');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(2)).toBe('Huisletter');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(2)).toBe('');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(3)).toBe('Huisnummertoevoeging');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(3)).toBe('');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(4)).toBe('Postcode');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(4)).toBe('1087KH');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(5)).toBe('Woonplaats');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(5)).toBe('Amsterdam');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().term(6)).toBe('Status');
    expect(page.dashboard().rightColumn().detail().nummeraanduiding().descriptionList().definition(6)).toBe('Naamgeving uitgegeven');

    expect(page.dashboard().rightColumn().detail().verblijfsobject().stelselpediaHeader().subtitle()).toBe('Verblijfsobject');
    expect(page.dashboard().rightColumn().detail().verblijfsobject().descriptionList().term(0)).toBe('Gebruiksdoel');
    expect(page.dashboard().rightColumn().detail().verblijfsobject().descriptionList().definition(0)).toBe('BEST-winkelfunctie');
    expect(page.dashboard().rightColumn().detail().verblijfsobject().descriptionList().term(1)).toBe('Feitelijk gebruik');
    expect(page.dashboard().rightColumn().detail().verblijfsobject().descriptionList().definition(1)).toBe('');

    mapDetailValidator(page);
};
