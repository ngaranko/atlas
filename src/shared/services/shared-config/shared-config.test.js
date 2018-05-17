import getSharedConfig from './shared-config';
import { getEnvironment } from '../../environment';

jest.mock('../../environment');

describe('The sharedConfig service', () => {
  it('gives you the configuration based on global environment', () => {
    getEnvironment.mockImplementation(() => ('PRODUCTION'));
    expect(getSharedConfig()).toMatchSnapshot();

    getEnvironment.mockImplementation(() => ('PRE_PRODUCTION'));
    expect(getSharedConfig()).toMatchSnapshot();

    getEnvironment.mockImplementation(() => ('ACCEPTATION'));
    expect(getSharedConfig()).toMatchSnapshot();

    getEnvironment.mockImplementation(() => ('DEVELOPMENT'));
    expect(getSharedConfig()).toMatchSnapshot();
  });

  it('gives you the configuration based on provided environment', () => {
    expect(getSharedConfig({ NAME: 'PRODUCTION' })).toMatchSnapshot();
    expect(getSharedConfig({ NAME: 'PRE_PRODUCTION' })).toMatchSnapshot();
    expect(getSharedConfig({ NAME: 'ACCEPTATION' })).toMatchSnapshot();
    expect(getSharedConfig({ NAME: 'DEVELOPMENT' })).toMatchSnapshot();
  });
});
