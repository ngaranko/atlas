import { act } from 'react-dom/test-utils'
import useDataFetching from './useDataFetching'
import testHook from '../../../test/test-hook'

jest.useFakeTimers()

let mockUseDataFetching
describe('useDataFetching', () => {
  beforeEach(() => {
    testHook(() => {
      mockUseDataFetching = useDataFetching('name')
    })
  })

  it('should have a fetchData function', () => {
    expect(mockUseDataFetching.fetchData).toBeInstanceOf(Function)
  })

  it('should have correct initial values', () => {
    expect(mockUseDataFetching.loading).toBe(false)
    expect(mockUseDataFetching.errorMessage).toBe(false)
    expect(mockUseDataFetching.results).toBe(null)
  })

  it('should set the loading state when fetchData is called', () => {
    expect(mockUseDataFetching.loading).toBe(false)

    act(() => {
      mockUseDataFetching.fetchData('test')
    })

    expect(mockUseDataFetching.loading).toBe(true)
  })
})
