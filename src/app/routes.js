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
  detail: {
    location: '/map/detail',
    type: `${ROUTER_NAMESPACE}/MAP_DETAIL`,
    page: PAGES.KAART_DETAIL
  },
  help: {
    location: '/help',
    type: `${ROUTER_NAMESPACE}/HELP`,
    page: PAGES.HELP
  },
  gegevens: {
    location: '/gegevens',
    type: `${ROUTER_NAMESPACE}/GEGEVENS`,
    page: PAGES.GEGEVENS
  },
  apis: {
    location: '/apis',
    type: `${ROUTER_NAMESPACE}/APIS`,
    page: PAGES.OVER_API
  },
  bediening: {
    location: '/bediening',
    type: `${ROUTER_NAMESPACE}/BEDIENING`,
    page: PAGES.BEDIENING
  },
  dataset: {
    location: '/dataset',
    type: `${ROUTER_NAMESPACE}/DATASET`,
    page: PAGES.DATASETS
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});

export const getCurrentPage = (actionType) => {
  const key = Object.keys(routing).find((route) => routing[route].type === actionType);
  return key && routing[key].page;
};

export default routes;
