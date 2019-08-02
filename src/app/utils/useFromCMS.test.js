import { renderHook } from '@testing-library/react-hooks'
import useFromCMS from './useFromCMS'
import cmsConfig from '../../shared/services/cms/cms-config'
import { getByUrl } from '../../shared/services/api/api'
import cmsNormalizer from '../../shared/services/cms/cms-normalizer'

jest.mock('../../shared/services/api/api')
jest.mock('../../shared/services/cms/cms-normalizer')
jest.useFakeTimers()

describe('useFromCMS', () => {
  const id = 3

  const { replace } = window.location

  beforeEach(() => {
    Object.defineProperty(window.location, 'replace', {
      configurable: true,
    })
    window.location.replace = jest.fn()
  })

  afterEach(() => {
    getByUrl.mockReset()
    cmsNormalizer.mockReset()
    window.location.replace = replace
  })

  it('should have correct initial values', async () => {
    const { result } = renderHook(() => useFromCMS(cmsConfig.publication, id))
    expect(result.current.loading).toBe(true)
    expect(result.current.results).toBeNull()
  })

  it('should return results when fetchData is called', async () => {
    const mockData = {
      drupal_internal__nid: 100,
    }
    getByUrl.mockReturnValueOnce(Promise.resolve(mockData))
    cmsNormalizer.mockReturnValueOnce(Promise.resolve(mockData))

    const { result, waitForNextUpdate } = renderHook(() => useFromCMS(cmsConfig.publication, id))
    expect(result.current.loading).toBe(true)
    expect(result.current.results).toBeNull()
    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.results).toEqual(mockData)
  })

  it('should redirect to no found page when the data is not available', async () => {
    const mockData = {
      drupal_internal__nid: 100,
    }
    getByUrl.mockReturnValueOnce(Promise.reject(mockData))
    cmsNormalizer.mockReturnValueOnce(Promise.resolve(mockData))

    const { result, waitForNextUpdate } = renderHook(() => useFromCMS(cmsConfig.publication, id))
    expect(result.current.loading).toBe(true)
    expect(result.current.results).toBeNull()
    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.results).toBeNull()
    expect(window.location.replace).toHaveBeenCalledTimes(1)
  })
})
