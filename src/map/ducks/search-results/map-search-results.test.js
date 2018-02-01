import reducer, {
  getMapSearchResults
} from './map-search-results';

it('sets the initial state', () => {
  expect(reducer(undefined, { type: 'UNKOWN' })).toMatchSnapshot();
});

it('handles search results request', () => {
  const action = getMapSearchResults({
    latitude: 52.3637006,
    longitude: 4.7943446
  }, { name: 'does not matter' });
  expect(reducer({}, action)).toMatchSnapshot();
});

it('handles search results success', () => {
  const action = {
    type: 'FETCH_MAP_SEARCH_RESULTS_SUCCESS',
    location: {
      latitude: 52.3637006,
      longitude: 4.7943446
    },
    mapSearchResults: [{ foo: 'bar' }] };
  expect(reducer({}, action)).toMatchSnapshot();
});
