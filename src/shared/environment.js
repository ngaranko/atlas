export const ENVIRONMENTS = {
  DEVELOPMENT: 'DEVELOPMENT',
  ACCEPTANCE: 'ACCEPTANCE',
  PRE_PRODUCTION: 'PRE_PRODUCTION',
  PRODUCTION: 'PRODUCTION'
};

export const HOSTS = {
  PRODUCTION: 'data.amsterdam.nl',
  PRE_PRODUCTION: 'pre.data.amsterdam.nl',
  ACCEPTANCE: 'acc.data.amsterdam.nl',
  DEVELOPMENT: 'localhost'
};

// DEPRECATED: used by modules/shared/services/eviroment/environment.factory.js
// NODE_ENV doesn't differentiate between pre-production and production
export const getEnvironment = (host) => {
  switch (host) {
    case 'data.amsterdam.nl':
      return ENVIRONMENTS.PRODUCTION;
    case 'pre.data.amsterdam.nl':
      return ENVIRONMENTS.PRE_PRODUCTION;
    case 'acc.data.amsterdam.nl':
      return ENVIRONMENTS.ACCEPTANCE;
    default:
      return ENVIRONMENTS.DEVELOPMENT;
  }
};

const ENVIRONMENT = (process.env.NODE_ENV).toUpperCase();

export default ENVIRONMENT;
