import {
  getEnvironment,
  ENVIRONMENT
} from './environment';

describe('The environment service', () => {
  it('has support for PRODUCTION', () => {
    expect(getEnvironment('data.amsterdam.nl')).toBe(ENVIRONMENT.PRODUCTION);
  });

  it('uses PRE_PRODUCTION on pre.data.amsterdam.nl', () => {
    expect(getEnvironment('pre.data.amsterdam.nl')).toBe(ENVIRONMENT.PRE_PRODUCTION);
  });

  it('uses ACCEPTATION on acc.data.amsterdam.nl', () => {
    expect(getEnvironment('acc.data.amsterdam.nl')).toBe(ENVIRONMENT.ACCEPTATION);
  });

  it('and a fallback to development for the rest', () => {
    expect(getEnvironment('localhost')).toBe(ENVIRONMENT.DEVELOPMENT);
  });
});
