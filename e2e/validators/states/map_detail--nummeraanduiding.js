'use strict';

const mapDetailValidator = require('./map_detail');

module.exports = function (page) {
    const detail = page.dashboard.rightColumn().detail();

    expect(page.title).toBe('Adres: Maria Austriastraat 730 - Atlas');

    expect(detail.nummeraanduiding().nummeraanduidingHeader().stelselpediaHeader().title())
        .toBe('Maria Austriastraat 730');
    expect(detail.nummeraanduiding().nummeraanduidingHeader().stelselpediaHeader().subtitle()).toBe('Adres');
    expect(detail.nummeraanduiding().descriptionList().term(0)).toBe('Naam openbare ruimte');
    expect(detail.nummeraanduiding().descriptionList().definition(0)).toBe('Maria Austriastraat');
    expect(detail.nummeraanduiding().descriptionList().term(1)).toBe('Huisnummer');
    expect(detail.nummeraanduiding().descriptionList().definition(1)).toBe('730');
    expect(detail.nummeraanduiding().descriptionList().term(2)).toBe('Huisletter');
    expect(detail.nummeraanduiding().descriptionList().definition(2)).toBe('');
    expect(detail.nummeraanduiding().descriptionList().term(3)).toBe('Huisnummertoevoeging');
    expect(detail.nummeraanduiding().descriptionList().definition(3)).toBe('');
    expect(detail.nummeraanduiding().descriptionList().term(4)).toBe('Postcode');
    expect(detail.nummeraanduiding().descriptionList().definition(4)).toBe('1087KH');
    expect(detail.nummeraanduiding().descriptionList().term(5)).toBe('Woonplaats');
    expect(detail.nummeraanduiding().descriptionList().definition(5)).toBe('Amsterdam');
    expect(detail.nummeraanduiding().descriptionList().term(6)).toBe('Status');
    expect(detail.nummeraanduiding().descriptionList().definition(6)).toBe('Naamgeving uitgegeven');

    expect(detail.verblijfsobject().stelselpediaHeader().subtitle()).toBe('Verblijfsobject');
    expect(detail.verblijfsobject().descriptionList().term(0)).toBe('Gebruiksdoel');
    expect(detail.verblijfsobject().descriptionList().definition(0)).toBe('BEST-woning');
    expect(detail.verblijfsobject().descriptionList().term(1)).toBe('Feitelijk gebruik');
    expect(detail.verblijfsobject().descriptionList().definition(1)).toBe('woning');

    mapDetailValidator(page);
};
