import {
  getEnvironment,
  ENVIRONMENTS
} from './environment';

describe('The environment service', () => {
  it('has support for PRODUCTION', () => {
    expect(getEnvironment('data.amsterdam.nl')).toBe(ENVIRONMENTS.PRODUCTION);
  });

  it('uses PRE_PRODUCTION on pre.data.amsterdam.nl', () => {
    expect(getEnvironment('pre.data.amsterdam.nl')).toBe(ENVIRONMENTS.PRE_PRODUCTION);
  });

  it('uses ACCEPTANCE on acc.data.amsterdam.nl', () => {
    const test = getEnvironment('acc.data.amsterdam.nl');
    expect(test).toBe(ENVIRONMENTS.ACCEPTANCE);
  });

  it('and a fallback to development for the rest', () => {
    expect(getEnvironment('localhost')).toBe(ENVIRONMENTS.DEVELOPMENT);
  });
});
