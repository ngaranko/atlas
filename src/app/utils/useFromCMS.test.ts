import { renderHook } from '@testing-library/react-hooks'
import useFromCMS from './useFromCMS'
import { getByUrl } from '../../shared/services/api/api'
import cmsJsonApiNormalizer from '../../shared/services/cms/cms-json-api-normalizer'
import useNormalizedCMSResults from '../../normalizations/cms/useNormalizedCMSResults'

jest.mock('../../shared/services/api/api')
jest.mock('../../shared/services/cms/cms-json-api-normalizer')
jest.mock('../../normalizations/cms/useNormalizedCMSResults')
jest.useFakeTimers()

describe('useFromCMS', () => {
  const id = 3

  const mockData = {
    uuid: 100,
  }

  beforeEach(() => {
    getByUrl.mockReturnValueOnce(Promise.resolve(mockData))
    cmsJsonApiNormalizer.mockReturnValueOnce(Promise.resolve(mockData))
    useNormalizedCMSResults.mockReturnValueOnce(mockData)
  })

  afterEach(() => {
    getByUrl.mockReset()
    cmsJsonApiNormalizer.mockReset()
  })

  const mockCMSconfig = {
    TEST: {
      endpoint: () => `https://test.url/api`,
      fields: ['field_title'],
    },
  }

  it('should have correct initial values', async () => {
    const { result } = renderHook(() => useFromCMS(mockCMSconfig.TEST, id))

    expect(result.current.loading).toBe(true)
    expect(result.current.results).toEqual([])
  })

  it('should return results when fetchData is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFromCMS(mockCMSconfig.TEST))

    expect(result.current.loading).toBe(true)
    expect(result.current.results).toEqual([])

    // call the fetchData function
    result.current.fetchData()
    expect(getByUrl).toHaveBeenCalledWith('https://test.url/api')

    // wait until it resolves
    await waitForNextUpdate()

    // handle the normalization
    expect(useNormalizedCMSResults).toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.results).toEqual(mockData)
  })

  it('should return results when fetchData is called and no normalization is required', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFromCMS(mockCMSconfig.TEST, undefined, false),
    )

    expect(result.current.loading).toBe(true)
    expect(result.current.results).toEqual([])

    // call the fetchData function
    result.current.fetchData()
    expect(getByUrl).toHaveBeenCalledWith('https://test.url/api')

    // wait until it resolves
    await waitForNextUpdate()

    // don't handle the normalization
    expect(cmsJsonApiNormalizer).not.toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.results).toEqual(mockData)
  })

  it('should return an error when thrown', async () => {
    getByUrl.mockReset()
    getByUrl.mockReturnValueOnce(Promise.reject(mockData))

    const { result, waitForNextUpdate } = renderHook(() => useFromCMS(mockCMSconfig.TEST, id))
    expect(result.current.loading).toBe(true)
    expect(result.current.results).toEqual([])

    // call the fetchData function
    result.current.fetchData()
    expect(getByUrl).toHaveBeenCalledWith('https://test.url/api')

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.results).toEqual([])
    expect(result.current.error).toBe(true)
  })
})
