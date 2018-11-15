import PAGES from './pages';

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
    type: `${ROUTER_NAMESPACE}/${PAGES.KAART}`,
    page: PAGES.KAART
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
    type: `${ROUTER_NAMESPACE}/${PAGES.NIEUWS}`,
    page: PAGES.NIEUWS
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
    type: `${ROUTER_NAMESPACE}/${PAGES.BEDIENING}`,
    page: PAGES.BEDIENING
  },
  gegevens: {
    title: '',
    path: '/gegevens',
    type: `${ROUTER_NAMESPACE}/${PAGES.GEGEVENS}`,
    page: PAGES.GEGEVENS
  },
  apis: {
    title: '',
    path: '/apis',
    type: `${ROUTER_NAMESPACE}/${PAGES.OVER_API}`,
    page: PAGES.OVER_API
  },
  privacy_beveiliging: {
    title: '',
    path: '/privacy-en-informatiebeveiliging',
    type: `${ROUTER_NAMESPACE}/${PAGES.PRIVACY_BEVEILIGING}`,
    page: PAGES.PRIVACY_BEVEILIGING
  },
  beschikbaar_kwaliteit: {
    title: '',
    path: '/beschikbaarheid-en-kwaliteit-data',
    type: `${ROUTER_NAMESPACE}/${PAGES.BESCHIKBAAR_KWALITEIT}`,
    page: PAGES.BESCHIKBAAR_KWALITEIT
  },
  beheer_werkwijze: {
    title: '',
    path: '/technisch-beheer-en-werkwijze',
    type: `${ROUTER_NAMESPACE}/${PAGES.BEHEER_WERKWIJZE}`,
    page: PAGES.BEHEER_WERKWIJZE
  },
  statistieken: {
    title: '',
    path: '/statistieken',
    type: `${ROUTER_NAMESPACE}/${PAGES.STATISTIEKEN}`,
    page: PAGES.STATISTIEKEN
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

export default routes;
