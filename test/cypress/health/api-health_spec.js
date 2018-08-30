import { USER_TOKENS } from '../support/authentication-commands';

describe('CityData api\'s', () => {
  const checkApiHealth = (requestUrl) => {
    cy.request({
      url: requestUrl,
      followRedirect: false, // turn off following redirects
      auth: {
        'bearer': USER_TOKENS.EMPLOYEE_PLUS
      },
      // headers: {
      //   'Content-Encoding': 'deflate',
      //   'Content-Type': 'application/json',
      // },
      // gzip: true,

    })
      .then((resp) => {
        // redirect status code is 200
        expect(resp.status).to.eq(200)
      })
  }

  describe('run authenticated', () => {
    before(() => {
      cy.login('EMPLOYEE_PLUS');
    });

    after(() => {
      cy.logout();
    });

    beforeEach(() => {
      cy.server();
    });

    it('ensure dcatd services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/dcatd/openapi',

        // TODO - there is an incorrect header or something
        // 'https://acc.api.data.amsterdam.nl/dcatd/datasets?%2Fproperties%2Fdcat:theme%2Fitems=eq%3Dtheme:energie&limit=100&offset=0',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure panorama services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/panorama/recente_opnames/alle/TMX7316010203-000719_pano_0000_000950/',
        'https://acc.api.data.amsterdam.nl/panorama/thumbnail/?lat=52.375764&lon=4.8914344&width=438&radius=180',
        'https://acc.api.data.amsterdam.nl/panorama/thumbnail/?lat=52.375764&lon=4.8914344&width=240&radius=50',
        'https://acc.api.data.amsterdam.nl/panorama/thumbnail/TMX7316010203-000227_pano_0000_001568/?width=240&heading=156',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure typeahead services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/typeahead?q=',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure dataselectie services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/dataselectie/bag/?buurt_naam=AMC&dataset=ves&page=1&postcode=1105AZ&shape=%5B%5D',
        'https://acc.api.data.amsterdam.nl/dataselectie/hr/?bijzondere_rechtstoestand=Faillissement&buurt_naam=Amstel+III+deel+A%2FB+Noord&buurtcombinatie_naam=Amstel+III%2FBullewijk&dataset=ves&page=1&shape=%5B%5D',
        'https://acc.api.data.amsterdam.nl/dataselectie/brk/?buurt_naam=Amstelveldbuurt&dataset=ves&eigenaar_cat=Woningbouwcorporaties&eigenaar_type=Appartementseigenaar&ggw_naam=Centrum-Oost&page=1&shape=%5B%5D&stadsdeel_naam=Centrum',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure geosearch services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/geosearch/nap/?lat=52.375764&lon=4.8914344&radius=25',
        'https://acc.api.data.amsterdam.nl/geosearch/atlas/?lat=52.375764&lon=4.8914344',
        'https://acc.api.data.amsterdam.nl/geosearch/munitie/?lat=52.375764&lon=4.8914344',
        'https://acc.api.data.amsterdam.nl/geosearch/bominslag/?lat=52.375764&lon=4.8914344&radius=25',
        'https://acc.api.data.amsterdam.nl/geosearch/monumenten/?lat=52.375764&lon=4.8914344&monumenttype=isnot_pand_bouwblok&radius=25',
        'https://acc.api.data.amsterdam.nl/geosearch/grondexploitatie/?lat=52.375764&lon=4.8914344',
        'https://acc.api.data.amsterdam.nl/geosearch/biz/?lat=52.375764&lon=4.8914344',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure grondexploitatie services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/grondexploitatie/stadsdeel/A/',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure bag services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/?pand=0363100012180422',
        'https://acc.api.data.amsterdam.nl/bag/pand/0363100012180422/',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure handelsregister services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/?pand=0363100012180422',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure monumenten services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/monumenten/monumenten/?betreft_pand=0363100012180422',
        'https://acc.api.data.amsterdam.nl/monumenten/situeringen/?betreft_nummeraanduiding=0363200000268416',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure bbga services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/bbga/cijfers/?gebiedcode15=A&jaar=latest&variabele=BEVHHMKIND_P',
        'https://acc.api.data.amsterdam.nl/bbga/meta/?variabele=BEVHHMKIND_P',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure gebieden services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/gebieden/stadsdeel/03630000000018/',
        'https://acc.api.data.amsterdam.nl/gebieden/buurtcombinatie/?stadsdeel=03630000000018',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure brk services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/brk/object-expand/?verblijfsobjecten__id=0363010000809818',
        'https://acc.api.data.amsterdam.nl/brk/subject/NL.KAD.Persoon.183189110/',
        'https://acc.api.data.amsterdam.nl/brk/zakelijk-recht/?kadastraal_subject=NL.KAD.Persoon.183189110',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });

    it('ensure wkpb services', () => {
      const requests = [
        'https://acc.api.data.amsterdam.nl/wkpb/brondocument/?beperking=3488',
        'https://acc.api.data.amsterdam.nl/wkpb/beperking/3488/',
      ];
      requests.forEach((requestUrl) => checkApiHealth(requestUrl));
    });


  });
});
