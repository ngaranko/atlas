export const ENVIRONMENTS = {
  DEVELOPMENT: 'DEVELOPMENT',
  ACCEPTATION: 'ACCEPTATION',
  PRE_PRODUCTION: 'PRE_PRODUCTION',
  PRODUCTION: 'PRODUCTION'
};

export const HOSTS = {
  PRODUCTION: 'data.amsterdam.nl',
  PRE_PRODUCTION: 'pre.data.amsterdam.nl',
  ACCEPTATION: 'acc.data.amsterdam.nl',
  DEVELOPMENT: 'localhost'
};

// deprecated
export const getEnvironment = (host) => {
  switch (host) {
    case 'data.amsterdam.nl':
      return ENVIRONMENTS.PRODUCTION;
    case 'pre.data.amsterdam.nl':
      return ENVIRONMENTS.PRE_PRODUCTION;
    case 'acc.data.amsterdam.nl':
      return ENVIRONMENTS.ACCEPTATION;
    default:
      return ENVIRONMENTS.DEVELOPMENT;
  }
};

const ENVIRONMENT = (process.env.NODE_ENV).toUpperCase();

export const getEnv = () => ENVIRONMENT;

export default ENVIRONMENT;
