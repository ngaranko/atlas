
import { act } from 'react-dom/test-utils'
import useFromCMS from './useFromCMS'
import testHook from '../../../test/test-hook'
import cmsConfig from '../../shared/services/cms/cms-config';

jest.useFakeTimers()

let mockuseFromCMS
describe('useFromCMS', () => {
  const id = 3

  beforeEach(() => {
    testHook(() => {
      mockuseFromCMS = useFromCMS()
    })
  })

  it('should have a fetchData function', () => {
    expect(mockuseFromCMS.fetchData).toBeInstanceOf(Function)
  })

  it('should have correct initial values', () => {
    expect(mockuseFromCMS.loading).toBe(false)
    expect(mockuseFromCMS.results).toBe(null)
  })

  it('should set the loading state when fetchData is called', () => {
    expect(mockuseFromCMS.loading).toBe(false)

    act(() => {
      mockuseFromCMS.fetchData(id, cmsConfig.article)
    })

    expect(mockuseFromCMS.loading).toBe(true)
  })
})
