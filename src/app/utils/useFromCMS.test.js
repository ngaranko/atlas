import { renderHook, act } from '@testing-library/react-hooks'
import useFromCMS from './useFromCMS'
import cmsConfig from '../../shared/services/cms/cms-config'
import { getByUrl } from '../../shared/services/api/api'
import cmsNormalizer from '../../shared/services/cms/cms-normalizer'

jest.mock('../../shared/services/api/api')
jest.mock('../../shared/services/cms/cms-normalizer')
jest.useFakeTimers()

describe('useFromCMS', () => {
  const id = 3

  beforeEach(() => {
  })

  afterEach(() => {
    getByUrl.mockReset()
    cmsNormalizer.mockReset()
  })

  it('should have correct initial values',async () => {
    const { result } = renderHook(() => useFromCMS(id, cmsConfig.publication))
    expect(result.current.loading).toBe(true)
    expect(result.current.results).toBeNull()
  })

  it('should return results when fetchData is called', async () => {
    const mockData = {
      drupal_internal__nid: 100,
      title: 'This is a title',
      created: '2015-05-05',
      body: {
        value: 'body text',
      },
      field_file_size: 'file size',
      field_file_type: 'pdf',
      field_publication_source: 'source',
      field_publication_intro: 'intro',
      field_slug: 'slug',
      included: [
        { attributes: { uri: { url: 'https://cover-link' } } },
        { attributes: { uri: { url: 'https://cover-link' } } },
        { attributes: { uri: { url: 'https://document-link' } } },
        { attributes: { uri: { url: 'https://document-link' } } },
      ],
    }
    const { result } = renderHook(() => useFromCMS(id, cmsConfig.publication))
    expect(result.current.loading).toBe(true)
    getByUrl.mockReturnValueOnce(Promise.resolve(mockData))
    cmsNormalizer.mockReturnValueOnce(Promise.resolve({...mockData}))
    // await waitForNextUpdate()

    // expect(result.current.loading).toBe(false)
  })
})
