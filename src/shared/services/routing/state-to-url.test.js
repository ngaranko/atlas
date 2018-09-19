import stateToUrl from './state-to-url';
import * as stateUrlConverter from './state-url-converter';

describe.only('The stateToUrl factory', () => {
  let mockedState;

  beforeEach(() => {
    const state2params = jasmine.createSpy('state2params');
    state2params.and.returnValue('state2params mock');
    stateUrlConverter.default = {
      state2params
    };


    mockedState = {
      aap: 'noot',
      mies: 'teun'
    };

    jest.spyOn(window.location, 'replace');
    jest.spyOn(window.location, 'search').and.returnValue({ query: 'search', result: '%20space' });
  });

  describe('can update the url to reflect the state', () => {
    it('by calling window.location.search', () => {
      stateToUrl.update(mockedState);
      expect(window.location.search).toHaveBeenCalledWith('state2params mock');
    });

    it('has the option to replace the URL by setting useReplace flag to true', () => {
      // regular call
      stateToUrl.update(mockedState);
      expect(window.location.replace).not.toHaveBeenCalled();
      expect(window.location.search).toHaveBeenCalled();

      window.location.replace.calls.reset();
      window.location.search.calls.reset();

      // call with useReplace flag set
      stateToUrl.update(mockedState, true);
      expect(window.location.replace).toHaveBeenCalled();
      expect(window.location.search).toHaveBeenCalled();
    });
  });
});
