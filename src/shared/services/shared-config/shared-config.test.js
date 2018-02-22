import getSharedConfig, { globalConfig, getEnvironmentHelper, environmentConfig } from './shared-config';
import { HOSTS, getEnvironment } from '../../environment';

describe('The sharedConfig service', () => {
  describe('getSharedConfig()', () => {
    Object.keys(environmentConfig).forEach((ENVIRONMENT) => {
      it(`if argument is passed it should return a combination of global and environment specific configuration - env:${ENVIRONMENT}`, () => {
        const generatedEnviroment = {
          NAME: getEnvironment(HOSTS[ENVIRONMENT])
        };
        const generatedConfig = getSharedConfig(generatedEnviroment);
        expect(generatedConfig.API_ROOT).toEqual(environmentConfig[ENVIRONMENT].API_ROOT);
        Object.keys(globalConfig).forEach((prop) => {
          expect(generatedConfig[prop]).toBe(globalConfig[prop]);
        });
      });

      it(`if no argument is passed it should return a combination of global and environment specific configuration - env:${ENVIRONMENT}`, () => {
        // set the window.location so location.host gets updated
        jsdom.reconfigure({
          url: `http://${HOSTS[ENVIRONMENT]}`
        });
        const generatedConfig = getSharedConfig();
        expect(generatedConfig.API_ROOT).toEqual(environmentConfig[ENVIRONMENT].API_ROOT);
        Object.keys(globalConfig).forEach((prop) => {
          expect(generatedConfig[prop]).toBe(globalConfig[prop]);
        });
      });
    });
  });

  describe('getEnvironmentHelper()', () => {
    Object.keys(environmentConfig).forEach((ENVIRONMENT) => {
      it(`should return the name of the environment if an argument is passed - env:${ENVIRONMENT}`, () => {
        const generatedEnviroment = {
          NAME: getEnvironment(HOSTS[ENVIRONMENT])
        };
        const name = getEnvironmentHelper(generatedEnviroment);
        expect(name).toEqual(ENVIRONMENT);
      });

      it(`should return the name of the environment if no argument is passed - env:${ENVIRONMENT}`, () => {
        jsdom.reconfigure({
          url: `http://${HOSTS[ENVIRONMENT]}`
        });
        const name = getEnvironmentHelper();
        expect(name).toEqual(ENVIRONMENT);
      });
    });
  });
});
