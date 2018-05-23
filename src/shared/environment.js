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

export const getEnvironment = (host) => {
  if (host === HOSTS.PRE_PRODUCTION) {
    return ENVIRONMENTS.PRE_PRODUCTION;
  }

  switch (process.env.NODE_ENV) {
    case 'production':
      return ENVIRONMENTS.PRODUCTION;
    case 'acceptance':
      return ENVIRONMENTS.ACCEPTATION;
    default:
      return ENVIRONMENTS.DEVELOPMENT;
  }
};

const ENVIRONMENT = (process.env.NODE_ENV).toUpperCase();

export default ENVIRONMENT;
