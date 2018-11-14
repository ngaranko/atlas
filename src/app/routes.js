import get from 'lodash.get';
import queryString from 'querystring';
import PAGES from './pages';
import PANORAMA_VIEW from '../shared/ducks/straatbeeld/panorama-view';
import { DETAIL_VIEW } from '../shared/ducks/detail/detail';

export const ROUTER_NAMESPACE = 'atlasRouter';

export const routing = {
  home: {
    title: 'Home',
    path: '/',
    type: `${ROUTER_NAMESPACE}/${PAGES.HOME}`,
    page: PAGES.HOME
  },
  map: {
    title: 'Grote kaart',
    path: '/kaart',
    type: `${ROUTER_NAMESPACE}/${PAGES.MAP}`,
    page: PAGES.MAP
  },
  datasets: {
    title: 'Datasets',
    path: '/datasets',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATASETS}`,
    page: PAGES.DATASETS
  },
  datasetsDetail: {
    title: '',
    path: '/datasets/detail/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATASETS_DETAIL}`,
    page: PAGES.DATASETS_DETAIL
  },
  addresses: {
    title: '',
    path: '/datasets/bag/adressen',
    type: `${ROUTER_NAMESPACE}/${PAGES.ADDRESSES}`,
    page: PAGES.ADDRESSES
  },
  establishments: {
    title: '',
    path: '/datasets/hr/vestigingen',
    type: `${ROUTER_NAMESPACE}/${PAGES.ESTABLISHMENTS}`,
    page: PAGES.ESTABLISHMENTS
  },
  cadastralObjects: {
    title: '',
    path: '/datasets/brk/kadastrale-objecten',
    type: `${ROUTER_NAMESPACE}/${PAGES.CADASTRAL_OBJECTS}`,
    page: PAGES.CADASTRAL_OBJECTS
  },
  searchDatasets: {
    path: '/datasets/zoek',
    type: `${ROUTER_NAMESPACE}/${PAGES.SEARCH_DATASETS}`,
    page: PAGES.SEARCH_DATASETS
  },
  dataSearch: {
    title: 'Data zoeken',
    path: '/data/',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATA_SEARCH}`,
    page: PAGES.DATA_SEARCH
  },
  detail: {
    title: '',
    path: '/map/detail',
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART_DETAIL}`,
    page: PAGES.KAART_DETAIL
  },
  panorama: {
    title: 'Panorama',
    path: '/datasets/panorama/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.PANORAMA}`,
    page: PAGES.PANORAMA
  },
  nieuws: {
    title: '',
    path: '/nieuws',
    type: `${ROUTER_NAMESPACE}/${PAGES.NEWS}`,
    page: PAGES.NEWS
  },
  help: {
    title: '',
    path: '/help',
    type: `${ROUTER_NAMESPACE}/${PAGES.HELP}`,
    page: PAGES.HELP
  },
  proclaimer: {
    title: '',
    path: '/proclaimer',
    type: `${ROUTER_NAMESPACE}/${PAGES.PROCLAIMER}`,
    page: PAGES.PROCLAIMER
  },

  bediening: {
    title: '',
    path: '/bediening#:deeplink?',
    type: `${ROUTER_NAMESPACE}/${PAGES.CONTROLS}`,
    page: PAGES.CONTROLS
  },
  gegevens: {
    title: '',
    path: '/gegevens',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATA_INFO}`,
    page: PAGES.DATA_INFO
  },
  apis: {
    title: '',
    path: '/apis',
    type: `${ROUTER_NAMESPACE}/${PAGES.ABOUT_API}`,
    page: PAGES.ABOUT_API
  },
  privacy_beveiliging: {
    title: '',
    path: '/privacy-en-informatiebeveiliging',
    type: `${ROUTER_NAMESPACE}/${PAGES.PRIVACY_SECURITY}`,
    page: PAGES.PRIVACY_SECURITY
  },
  beschikbaar_kwaliteit: {
    title: '',
    path: '/beschikbaarheid-en-kwaliteit-data',
    type: `${ROUTER_NAMESPACE}/${PAGES.AVAILABILITY_QUALITY}`,
    page: PAGES.AVAILABILITY_QUALITY
  },
  beheer_werkwijze: {
    title: '',
    path: '/technisch-beheer-en-werkwijze',
    type: `${ROUTER_NAMESPACE}/${PAGES.MANAGEMENT}`,
    page: PAGES.MANAGEMENT
  },
  statistieken: {
    title: '',
    path: '/statistieken',
    type: `${ROUTER_NAMESPACE}/${PAGES.STATISTICS}`,
    page: PAGES.STATISTICS
  },

  dataDetail: {
    title: 'Data detail',
    path: '/datasets/:type/:subtype/:id',
    type: `${ROUTER_NAMESPACE}/${PAGES.DATA_DETAIL}`,
    page: PAGES.DATA_DETAIL
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].path;
  return acc;
}, {});


// Action creators
const preserveQuery = (action) => {
  const search = location.search && location.search.substr(1);
  return {
    ...action,
    meta: {
      query: {
        ...queryString.decode(search), // Todo: temporary solution to pass existing query
        ...get(action, 'meta.query')
      }
    }
  };
};

export const toDataDetail = (id, type, subtype, view) => {
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

export const toDataLocationSearch = () => preserveQuery({ // TODO rename
  type: routing.dataSearch.type
});

export const toMap = () => preserveQuery({ type: routing.map.type });

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
  const matches = endpoint.match(/(\w+)\/([\w]+)\/([\w\.-]+)\/?$/); // eslint-disable-line no-useless-escape
  return {
    type: matches[1],
    subtype: matches[2],
    id: matches[3]
  };
};

export const getPageActionEndpoint = (endpoint, view) => {
  const { type, subtype, id } = getDetailPageData(endpoint);
  return toDataDetail(id, type, subtype, view);
};


export const pageTypeToEndpoint = (type, subtype, id) => {
  let endpoint = 'https://acc.api.data.amsterdam.nl/';
  endpoint += `${type}/${subtype}/${id}/`; // TODO: refactor, get back-end to return detail as detail GET not listing!
  return endpoint;
};

export const toDataSearch = (searchQuery) => ({
  type: routing.dataSearch.type,
  meta: {
    query: {
      zoekterm: searchQuery
    }
  }
});

export const toDatasetSearch = (searchQuery) => ({
  type: routing.searchDatasets.type,
  meta: {
    query: {
      zoekterm: searchQuery
    }
  }
});

export default routes;
