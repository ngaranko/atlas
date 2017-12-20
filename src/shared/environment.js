export const ENVIRONMENT = {
  DEVELOPMENT: 'DEVELOPMENT',
  ACCEPTATION: 'ACCEPTATION',
  PRE_PRODUCTION: 'PRE_PRODUCTION',
  PRODUCTION: 'PRODUCTION'
};

export const getEnvironment = (host) => {
  switch (host) {
    case 'data.amsterdam.nl':
      return ENVIRONMENT.PRODUCTION;
    case 'pre.data.amsterdam.nl':
      return ENVIRONMENT.PRE_PRODUCTION;
    case 'acc.data.amsterdam.nl':
      return ENVIRONMENT.ACCEPTATION;
    default:
      return ENVIRONMENT.DEVELOPMENT;
  }
};
