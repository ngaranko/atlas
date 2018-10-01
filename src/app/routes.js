import PAGES from './pages';

export const ROUTER_NAMESPACE = 'atlasRouter';

export const routing = {
  home: {
    location: '/',
    type: `${ROUTER_NAMESPACE}/HOME`,
    page: PAGES.HOME
  },
  map: {
    location: '/map',
    type: `${ROUTER_NAMESPACE}/MAP`,
    page: PAGES.KAART
  },
  dataset: {
    location: '/dataset',
    type: `${ROUTER_NAMESPACE}/DATASET`,
    page: PAGES.DATASETS
  },
  detail: {
    location: '/map/detail',
    type: `${ROUTER_NAMESPACE}/MAP_DETAIL`,
    page: PAGES.KAART_DETAIL
  },

  nieuws: {
    location: '/nieuws',
    type: `${ROUTER_NAMESPACE}/NIEUWS`,
    page: PAGES.NIEUWS
  },
  help: {
    location: '/help',
    type: `${ROUTER_NAMESPACE}/HELP`,
    page: PAGES.HELP
  },
  proclaimer: {
    location: '/proclaimer',
    type: `${ROUTER_NAMESPACE}/PROCLAIMER`,
    page: PAGES.PROCLAIMER
  },
  bediening: {
    location: '/bediening',
    type: `${ROUTER_NAMESPACE}/BEDIENING`,
    page: PAGES.BEDIENING
  },
  apis: {
    location: '/apis',
    type: `${ROUTER_NAMESPACE}/APIS`,
    page: PAGES.OVER_API
  },
  gegevens: {
    location: '/gegevens',
    type: `${ROUTER_NAMESPACE}/GEGEVENS`,
    page: PAGES.GEGEVENS
  },
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});

export default routes;
