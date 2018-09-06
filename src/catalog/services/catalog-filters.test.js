import fetchFilters from './catalog-filters';
import mockApiData from './catalog-filters.mock';

describe('fetchFilters', () => {
  const state = {
    user: {
      accessToken: null
    }
  };
  global.reduxStore = {
    getState: () => state
  };

  it('should return the correct data', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockApiData));
    const result = await fetchFilters();
    expect(result).toMatchSnapshot();
  });
});
