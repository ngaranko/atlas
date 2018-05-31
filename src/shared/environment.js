export const ENVIRONMENT = {
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

export const getEnvironment = (host) => {
  if (host === HOSTS.PRE_PRODUCTION) {
    return ENVIRONMENT.PRE_PRODUCTION;
  }

  switch (process.env.NODE_ENV) {
    case 'production':
      return ENVIRONMENT.PRODUCTION;
    case 'acceptance':
      return ENVIRONMENT.ACCEPTATION;
    default:
      return ENVIRONMENT.DEVELOPMENT;
  }
};
