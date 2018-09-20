import stateToUrl from './state-to-url';
import * as stateUrlConverter from './state-url-converter';
import { history } from '../../../history';

jest.mock('../../../history');

describe('The stateToUrl', () => {
  let mockedState;

  beforeEach(() => {
    stateUrlConverter.default = {
      state2params: jest.fn(() => 'state2params mock')
    };

    mockedState = {
      aap: 'noot',
      mies: 'teun'
    };

    jest.spyOn(history, 'replace');
    jest.spyOn(history, 'push').mockImplementation(() => ({ query: 'search', result: '%20space' }));
  });

  describe('can update the url to reflect the state', () => {
    it('by calling window.location.search', () => {
      stateToUrl.update(mockedState);
      expect(history.push).toHaveBeenCalledWith('state2params mock');
    });

    it('has the option to replace the URL by setting useReplace flag to true', () => {
      // regular call
      stateToUrl.update(mockedState);
      expect(history.replace).not.toHaveBeenCalled();
      expect(history.push).toHaveBeenCalled();

      history.replace.calls.reset();
      history.search.calls.reset();

      // call with useReplace flag set
      stateToUrl.update(mockedState, true);
      expect(history.replace).toHaveBeenCalled();
      expect(history.search).toHaveBeenCalled();
    });
  });
});
