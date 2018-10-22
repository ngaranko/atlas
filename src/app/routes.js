import PAGES from './pages';
import '../shared/ducks/straatbeeld/straatbeeld'; // eslint-disable-line no-unused-vars
import PANORAMA_VIEW from '../shared/ducks/straatbeeld/panorama-view';
import { fetchDetail } from '../shared/ducks/detail/detail';

export const ROUTER_NAMESPACE = 'atlasRouter';

export const routing = {
  home: {
    title: 'Home',
    location: '/',
    type: `${ROUTER_NAMESPACE}/${PAGES.HOME}`,
    page: PAGES.HOME
  },
  map: {
    title: 'Grote kaart',
    location: '/kaart',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART}`,
    page: PAGES.KAART
  },
  catalogus: {
    title: 'Datasets',
    location: '/datasets',
    type: `${ROUTER_NAMESPACE}/${PAGES.CATALOGUS}`,
    page: PAGES.CATALOGUS
  },
  catalogusDetail: {
    title: '',
    location: '/datasets/detail/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.CATALOGUS_DETAIL}`,
    page: PAGES.CATALOGUS_DETAIL
  },
  adressen: {
    title: '',
    location: '/datasets/bag/adressen',
    type: `${ROUTER_NAMESPACE}/${PAGES.ADRESSEN}`,
    page: PAGES.ADRESSEN
  },
  vestigingen: {
    title: '',
    location: '/vestigingen',
    type: `${ROUTER_NAMESPACE}/${PAGES.VESTIGINGEN}`,
    page: PAGES.VESTIGINGEN
  },
  searchCatalog: {
    location: '/search/catalog/:query',
    type: `${ROUTER_NAMESPACE}/${PAGES.SEARCH_CATALOG}`,
    page: PAGES.SEARCH_CATALOG
  },
  searchData: {
    location: '/search/data/:query',
    type: `${ROUTER_NAMESPACE}/${PAGES.SEARCH_DATA}`,
    page: PAGES.SEARCH_DATA
  },
  dataset: {
    title: '',
    location: '/dataset',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATASETS}`,
    page: PAGES.DATASETS
  },
  detail: {
    title: '',
    location: '/map/detail',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_DETAIL}`,
    page: PAGES.KAART_DETAIL
  },
  panorama: {
    title: 'Panorama',
    location: '/datasets/panorama/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.PANORAMA}`,
    page: PAGES.PANORAMA
  },
  mapSearch: {
    title: '',
    location: '/map/search',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_SEARCH}`,
    page: PAGES.KAART_SEARCH
  },
  mapEmbed: {
    title: 'Embed',
    location: '/map/embed',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_EMBED}`,
    page: PAGES.KAART_EMBED
  },
  nieuws: {
    title: '',
    location: '/nieuws',
    type: `${ROUTER_NAMESPACE}/${PAGES.NIEUWS}`,
    page: PAGES.NIEUWS
  },
  help: {
    title: '',
    location: '/help',
    type: `${ROUTER_NAMESPACE}/${PAGES.HELP}`,
    page: PAGES.HELP
  },
  proclaimer: {
    title: '',
    location: '/proclaimer',
    type: `${ROUTER_NAMESPACE}/${PAGES.PROCLAIMER}`,
    page: PAGES.PROCLAIMER
  },

  bediening: {
    title: '',
    location: '/bediening#:deeplink?',
    type: `${ROUTER_NAMESPACE}/${PAGES.BEDIENING}`,
    page: PAGES.BEDIENING
  },
  gegevens: {
    title: '',
    location: '/gegevens',
    type: `${ROUTER_NAMESPACE}/${PAGES.GEGEVENS}`,
    page: PAGES.GEGEVENS
  },
  apis: {
    title: '',
    location: '/apis',
    type: `${ROUTER_NAMESPACE}/${PAGES.OVER_API}`,
    page: PAGES.OVER_API
  },
  privacy_beveiliging: {
    title: '',
    location: '/privacy-en-informatiebeveiliging',
    type: `${ROUTER_NAMESPACE}/${PAGES.PRIVACY_BEVEILIGING}`,
    page: PAGES.PRIVACY_BEVEILIGING
  },
  beschikbaar_kwaliteit: {
    title: '',
    location: '/beschikbaarheid-en-kwaliteit-data',
    type: `${ROUTER_NAMESPACE}/${PAGES.BESCHIKBAAR_KWALITEIT}`,
    page: PAGES.BESCHIKBAAR_KWALITEIT
  },
  beheer_werkwijze: {
    title: '',
    location: '/technisch-beheer-en-werkwijze',
    type: `${ROUTER_NAMESPACE}/${PAGES.BEHEER_WERKWIJZE}`,
    page: PAGES.BEHEER_WERKWIJZE
  },
  statistieken: {
    title: '',
    location: '/statistieken',
    type: `${ROUTER_NAMESPACE}/${PAGES.STATISTIEKEN}`,
    page: PAGES.STATISTIEKEN
  },

  adresDetail: {
    title: 'Adres',
    location: '/datasets/bag/adressen/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.ADRES_DETAIL}`,
    page: PAGES.ADRES_DETAIL
  },
  pandDetail: {
    title: 'Pand',
    location: '/datasets/bag/pand/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.PAND_DETAIL}`,
    page: PAGES.PAND_DETAIL
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});

// TODO: refactor unit test or remove all together
export const extractIdEndpoint = (endpoint) => {
  const matches = endpoint.match(/\/(\w+)\/?$/);
  return matches[1];
};

const getDetailPageType = (endpoint) => {
  if (/\/bag\/pand/.test(endpoint)) {
    return routing.pandDetail.type;
  } else if (/\/bag\/nummeraanduiding/.test(endpoint)) {
    return routing.adresDetail.type;
  }
  return routing.adresDetail.type; // TODO: refactor, always return sensible route type
};

export const getPageActionEndpoint = (endpoint) => {
  const type = getDetailPageType(endpoint);
  const id = extractIdEndpoint(endpoint);
  return {
    type,
    payload: {
      id: `id${id}`
    }
  };
};

export const pageActionToEndpoint = (action) => {
  let endpoint = 'https://acc.api.data.amsterdam.nl/';
  switch (action.type) {
    case routing.adresDetail.type:
      endpoint += 'bag/nummeraanduiding/';
      break;
    case routing.pandDetail.type:
      endpoint += 'bag/pand/';
      break;

    default:
  }

  const id = action.payload.id.substr(2); // Change `id123` to `123`
  endpoint += `${id}`;

  return fetchDetail(endpoint);
};


// Action creators

export const toMap = () => ({
  type: routing.map.type
});

export const toPanorama = (id, heading, view) => {
  const action = {
    type: routing.panorama.type,
    payload: {
      id
    },
    meta: {
      query: {
        heading
      }
    }
  };
  if (view === PANORAMA_VIEW.MAP) {
    action.meta.query.kaart = '';
  }
  if (view === PANORAMA_VIEW.PANO) {
    action.meta.query.panorama = '';
  }
  return action;
};

export default routes;
