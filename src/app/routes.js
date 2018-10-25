import PAGES from './pages';
import PANORAMA_VIEW from '../shared/ducks/straatbeeld/panorama-view';
import { DETAIL_VIEW, fetchDetail } from '../shared/ducks/detail/detail';
import { UPDATE_MAP } from '../map/ducks/map/map';

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

  dataDetail: {
    title: 'Data detail',
    location: '/datasets/:type/:subtype/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATA_DETAIL}`,
    page: PAGES.DATA_DETAIL
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});


// Action creators
export const toDetail = (id, type, subtype, view) => {
  const action = {
    type: routing.dataDetail.type,
    payload: {
      type,
      subtype,
      id: `id${id}`
    },
    meta: {
      query: {
      }
    }
  };
  if (view === DETAIL_VIEW.MAP) {
    action.meta.query.kaart = '';
  }
  return action;
};

export const toGeoSearchView = () => ({
  type: routing.mapSearch.type
});

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

// Detail page logic
// TODO: refactor unit test or remove all together
export const extractIdEndpoint = (endpoint) => {
  const matches = endpoint.match(/\/([\w-]+)\/?$/);
  return matches[1];
};

const getDetailPageData = (endpoint) => {
  const matches = endpoint.match(/(\w+)\/([\w]+)\/[\w-]+\/?$/);
  // console.log('generic matching endpoint: ', endpoint);
  return {
    type: matches[1],
    subtype: matches[2]
  };
};

export const getPageActionEndpoint = (endpoint, view) => {
  const { type, subtype } = getDetailPageData(endpoint);
  const id = extractIdEndpoint(endpoint);
  return toDetail(id, type, subtype, view);
};

export const pageActionToEndpoint = (action) => {
  let endpoint = 'https://acc.api.data.amsterdam.nl/';
  const { type, subtype } = action.payload;
  endpoint += `${type}/${subtype}/`;

  const id = action.payload.id.substr(2); // Change `id123` to `123`
  endpoint += `${id}/`; // TODO: refactor, get back-end to return detail as detail GET not listing!

  return fetchDetail(endpoint);
};

export default routes;
