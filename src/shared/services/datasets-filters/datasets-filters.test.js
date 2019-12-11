import fetchApiSpecification from './datasets-filters'
import mockApiData from './datasets-filters.mock'

describe('fetchApiSpecification', () => {
  const state = {
    user: {
      accessToken: null,
    },
  }
  global.reduxStore = {
    getState: () => state,
  }

  // Skipped for now because of the usage of logPerf function
  it.skip('should return the correct data', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockApiData))
    const result = await fetchApiSpecification()
    expect(result).toMatchSnapshot()
  })
})
