const config = {
  endpoints: [
    {
      uri: 'geosearch/nap/',
      radius: 25
    }, {
      uri: 'geosearch/atlas/',
      radius: null
    }, {
      uri: 'geosearch/munitie/',
      radius: null
    }, {
      uri: 'geosearch/bominslag/',
      radius: 25
    }, {
      uri: 'geosearch/monumenten/',
      radius: 25
    }
  ],
  hierarchy: [
    {
      slug: 'openbareruimte',
      label_singular: 'Openbare ruimte',
      label_plural: 'Openbare ruimtes',
      features: ['bag/openbareruimte']
    }, {
      slug: 'pand',
      label_singular: 'Pand',
      label_plural: 'Panden',
      features: ['bag/pand']
    }, {
      slug: 'standplaats',
      label_singular: 'Standplaats',
      label_plural: 'Standplaatsen',
      features: ['bag/standplaats']
    }, {
      slug: 'ligplaats',
      label_singular: 'Ligplaats',
      label_plural: 'Ligplaatsen',
      features: ['bag/ligplaats']
    }, {
      slug: 'kadastraal-object',
      label_singular: 'Kadastraal object',
      label_plural: 'Kadastrale objecten',
      features: ['kadaster/kadastraal_object']
    }, {
      slug: 'gemeentelijke-beperking',
      label_singular: 'Gemeentelijke beperking',
      label_plural: 'Gemeentelijke beperkingen',
      features: ['wkpb/beperking']
    }, {
      slug: 'gebied',
      label_singular: 'Gebied',
      label_plural: 'Gebieden',
      features: [
        'gebieden/grootstedelijkgebied',
        'gebieden/unesco',
        'gebieden/stadsdeel',
        'gebieden/gebiedsgerichtwerken',
        'gebieden/buurtcombinatie',
        'gebieden/buurt',
        'gebieden/bouwblok'
      ],
      subtypes: {
        grootstedelijkgebied: 'grootstedelijk gebied',
        gebiedsgerichtwerken: 'gebiedsgericht werken'
      }
    }, {
      slug: 'meetbout',
      label_singular: 'Meetbout',
      label_plural: 'Meetbouten',
      features: ['meetbouten/meetbout']
    }, {
      slug: 'nap-peilmerk',
      label_singular: 'NAP Peilmerk',
      label_plural: 'NAP Peilmerken',
      features: ['nap/peilmerk']
    }, {
      slug: 'explosief',
      label_singular: 'Explosief',
      label_plural: 'Explosieven',
      features: [
        'bommenkaart/verdachtgebied',
        'bommenkaart/bominslag',
        'bommenkaart/uitgevoerdonderzoek',
        'bommenkaart/gevrijwaardgebied'
      ],
      subtypes: {
        bominslag: 'inslag',
        gevrijwaardgebied: 'gevrijwaard gebied',
        uitgevoerdonderzoek: 'reeds uitgevoerd CE onderzoek',
        verdachtgebied: 'verdacht gebied'
      }
    }, {
      slug: 'monument',
      label_singular: 'Monument',
      label_plural: 'Monumenten',
      features: ['monumenten/monument']
    }
  ],
  categoriesByFeature: {}
};

config.hierarchy.forEach((category) => {
  category.features.forEach((feature) => {
    config.categoriesByFeature[feature] = category;
  });
});

export default config;
