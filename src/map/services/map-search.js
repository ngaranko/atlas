import * as address from '../../shared/services/adressen/adressen-nummeraanduiding';
import * as monument from '../../shared/services/monument/monument';
import * as vestiging from '../../shared/services/vestiging/vestiging';

import apiUrl from '../../shared/services/api';

const endpoints = [
  { uri: 'geosearch/nap/', radius: 25 },
  { uri: 'geosearch/atlas/' },
  { uri: 'geosearch/munitie/' },
  { uri: 'geosearch/bominslag/', radius: 25 },
  { uri: 'geosearch/monumenten/',
    radius: 25,
    extra_params: {
      monumenttype: 'isnot_pand_bouwblok'
    }
  }
];

const categoryLabels = {
  address: {
    singular: 'Adres',
    plural: 'Adressen'
  },
  explosief: {
    singular: 'Explosief',
    plural: 'Explosieven'
  },
  gebied: {
    singular: 'Gebied',
    plural: 'Gebieden'
  },
  gemeentelijkeBeperking: {
    singular: 'Gemeentelijke beperking',
    plural: 'Gemeentelijke beperkingen'
  },
  kadastraalObject: {
    singular: 'Kadastraal object',
    plural: 'Kadastrale objecten'
  },
  ligplaats: {
    singular: 'Ligplaats',
    plural: 'Ligplaatsen'
  },
  meetbout: {
    singular: 'Meetbout',
    plural: 'Meetbouten'
  },
  monument: {
    singular: 'Monument',
    plural: 'Monumenten'
  },
  napPijlmerk: {
    singular: 'NAP Peilmerk',
    plural: 'NAP Peilmerken'
  },
  openbareRuimte: {
    singular: 'Openbare ruimte',
    plural: 'Openbare ruimtes'
  },
  pand: {
    singular: 'Pand',
    plural: 'Panden'
  },
  standplaats: {
    singular: 'Standplaats',
    plural: 'Standplaatsen'
  },
  vestiging: {
    singular: 'Vestiging',
    plural: 'Vestigingen'
  }
};

const categoryLabelsByType = {
  'bag/ligplaats': categoryLabels.ligplaats,
  'bag/openbareruimte': categoryLabels.openbareRuimte,
  'bag/pand': categoryLabels.pand,
  'bag/standplaats': categoryLabels.standplaats,
  'bommenkaart/bominslag': categoryLabels.explosief,
  'bommenkaart/gevrijwaardgebied': categoryLabels.explosief,
  'bommenkaart/uitgevoerdonderzoek': categoryLabels.explosief,
  'bommenkaart/verdachtgebied': categoryLabels.explosief,
  'gebieden/bouwblok': categoryLabels.gebied,
  'gebieden/buurt': categoryLabels.gebied,
  'gebieden/buurtcombinatie': categoryLabels.gebied,
  'gebieden/gebiedsgerichtwerken': categoryLabels.gebied,
  'gebieden/grootstedelijkgebied': categoryLabels.gebied,
  'gebieden/stadsdeel': categoryLabels.gebied,
  'gebieden/unesco': categoryLabels.gebied,
  'kadaster/kadastraal_object': categoryLabels.kadastraalObject,
  'meetbouten/meetbout': categoryLabels.meetbout,
  'monumenten/monument': categoryLabels.monument,
  'pand/address': categoryLabels.address,
  'pand/monument': categoryLabels.monument,
  'nap/peilmerk': categoryLabels.napPijlmerk,
  vestiging: categoryLabels.vestiging,
  'wkpb/beperking': categoryLabels.gemeentelijkeBeperking
};

export const categoryTypeOrder = [
  'bag/openbareruimte',
  'bag/pand',
  'pand/address',
  'bag/ligplaats',
  'bag/standplaats',
  'vestiging',
  'pand/vestiging',
  'pand/monument',
  'kadaster/kadastraal_object',
  'wkpb/beperking',
  'gebieden/grootstedelijkgebied',
  'gebieden/unesco',
  'gebieden/stadsdeel',
  'gebieden/gebiedsgerichtwerken',
  'gebieden/buurtcombinatie',
  'gebieden/buurt',
  'gebieden/bouwblok',
  'meetbouten/meetbout',
  'nap/peilmerk',
  'bommenkaart/bominslag',
  'bommenkaart/verdachtgebied',
  'bommenkaart/gevrijwaardgebied',
  'bommenkaart/uitgevoerdonderzoek',
  'monumenten/monument'
];

const relatedResourcesByType = {
  'bag/ligplaats': [
    {
      fetch: (ligplaatsId) => address
        .fetchHoofdadresByLigplaatsId(ligplaatsId)
        .then((result) => vestiging.fetchByAddressId(result.id)),
      type: 'vestiging',
      authScope: 'HR/R'
    }
  ],
  'bag/pand': [
    {
      fetch: address.fetchByPandId,
      type: 'pand/address'
    }, {
      fetch: vestiging.fetchByPandId,
      type: 'vestiging',
      authScope: 'HR/R'
    }, {
      fetch: monument.fetchByPandId,
      type: 'pand/monument'
    }
  ],
  'bag/standplaats': [
    {
      fetch: (standplaatsId) => address
        .fetchHoofdadresByStandplaatsId(standplaatsId)
        .then((result) => vestiging.fetchByAddressId(result.id)),
      type: 'vestiging',
      authScope: 'HR/R'
    }
  ]
};

const fetchRelatedForUser = (user) => (data) => {
  const item = data.features.find((feature) => relatedResourcesByType[feature.properties.type]);

  if (!item) {
    return data.features;
  }

  const resources = relatedResourcesByType[item.properties.type];
  const requests = resources.map((resource) => (
    (resource.authScope &&
      (!user.authenticated || !user.scopes.includes(resource.authScope))
    ) ? [] :
      resource.fetch(item.properties.id)
        .then((results) => results
          .map((result) => ({
            ...result,
            properties: {
              uri: result._links.self.href,
              display: result._display,
              type: resource.type,
              parent: item.properties.type
            }
          }))
        )
  ));

  return Promise.all(requests)
    .then((results) => results
      .reduce((accumulator, subResults) => accumulator.concat(subResults),
        data.features));
};

export default function search(location, user) {
  const allRequests = endpoints.map((endpoint) => {
    const searchParams = {
      ...endpoint.extra_params,
      lat: location.latitude,
      lon: location.longitude,
      radius: endpoint.radius || 0
    };

    const queryString = Object.keys(searchParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
      .join('&');

    return fetch(`${apiUrl}${endpoint.uri}?${queryString}`)
      .then((response) => response.json())
      .then(fetchRelatedForUser(user))
      .then((features) => features
        .map((feature) => ({
          uri: feature.properties.uri,
          label: feature.properties.display,
          categoryLabel: categoryLabelsByType[feature.properties.type].singular,
          categoryLabelPlural: categoryLabelsByType[feature.properties.type].plural,
          type: feature.properties.type,
          isNevenadres: feature.hoofdadres !== 'undefined' ? !feature.hoofdadres : false,
          count: feature.count,
          status: feature.vbo_status ? feature.vbo_status : {},
          parent: feature.properties.parent
        }))
      );
  });

  return Promise.all(allRequests)
    .then((results) => results
      .reduce((accumulator, subResults) => accumulator.concat(subResults)))
    .then((results) => results);
}
