export const ROUTER_NAMESPACE = 'atlasRouter';

export const routing = {
  home: {
    location: '/',
    type: `${ROUTER_NAMESPACE}/HOME`
  },
  map: {
    location: '/map',
    type: `${ROUTER_NAMESPACE}/MAP`
  },
  detail: {
    location: '/map/detail',
    type: `${ROUTER_NAMESPACE}/MAP_DETAIL`
  },
  help: {
    location: '/help',
    type: `${ROUTER_NAMESPACE}/HELP`
  },
  gegevens: {
    location: '/gegevens',
    type: `${ROUTER_NAMESPACE}/GEGEVENS`
  },
  apis: {
    location: '/apis',
    type: `${ROUTER_NAMESPACE}/APIS`
  },
  bediening: {
    location: '/bediening',
    type: `${ROUTER_NAMESPACE}/BEDIENING`
  },
  dataset: {
    location: '/dataset',
    type: `${ROUTER_NAMESPACE}/DATASET`
  }
};

// e.g. { home: '/' }, to be used by redux-first-router/connectRoutes
const routes = Object.keys(routing).reduce((acc, key) => {
  acc[routing[key].type] = routing[key].location;
  return acc;
}, {});

export const getCurrentPage = (actionType) =>
  Object.keys(routing).find((route) => routing[route].type === actionType);

export default routes;
