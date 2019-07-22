
import { act } from 'react-dom/test-utils'
import useFromCMS from './useFromCMS'
import testHook from '../../../test/test-hook'

jest.useFakeTimers()

let mockuseFromCMS
describe('useFromCMS', () => {
  beforeEach(() => {
    testHook(() => {
      mockuseFromCMS = useFromCMS('name', ['foo'])
    })
  })

  it('should have a fetchData function', () => {
    expect(mockuseFromCMS.fetchFromCMS).toBeInstanceOf(Function)
  })

  it('should have correct initial values', () => {
    expect(mockuseFromCMS.loading).toBe(false)
    expect(mockuseFromCMS.results).toBe(null)
  })

  it('should set the loading state when fetchData is called', () => {
    expect(mockuseFromCMS.loading).toBe(false)

    act(() => {
      mockuseFromCMS.fetchFromCMS('name', ['foo'])
    })

    expect(mockuseFromCMS.loading).toBe(true)
  })
})