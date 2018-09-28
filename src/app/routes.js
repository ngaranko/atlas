export const routerNamespace = 'atlasRouter';

export const routing = {
  home: {
    location: '/',
    type: `${routerNamespace}/HOME`
  },
  map: {
    location: '/map',
    type: `${routerNamespace}/MAP`
  },
  mapId: {
    location: '/map/:id',
    type: `${routerNamespace}/MAP_ID`
  },
  help: {
    location: '/help',
    type: `${routerNamespace}/HELP`
  },
  gegevens: {
    location: '/gegevens',
    type: `${routerNamespace}/GEGEVENS`
  },
  apis: {
    location: '/apis',
    type: `${routerNamespace}/APIS`
  },
  bediening: {
    location: '/bediening',
    type: `${routerNamespace}/BEDIENING`
  },
  dataset: {
    location: '/dataset',
    type: `${routerNamespace}/DATASET`
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
