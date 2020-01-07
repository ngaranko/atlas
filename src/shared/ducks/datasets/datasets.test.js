import { getApiSpecification, getApiSpecificationData, DATASETS } from './datasets'
import { API_SPECIFICATION } from './apiSpecification/apiSpecification'

describe('datasets selectors', () => {
  const state = {
    [DATASETS]: {
      [API_SPECIFICATION]: {
        data: 'foo',
      },
    },
  }

  it('should get dataset apiSpecification selectors', () => {
    expect(getApiSpecification(state)).toEqual(state[DATASETS][API_SPECIFICATION])
    expect(getApiSpecificationData(state)).toEqual(state[DATASETS][API_SPECIFICATION].data)
  })
})
