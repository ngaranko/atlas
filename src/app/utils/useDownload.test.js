import { act } from 'react-dom/test-utils'
import useDownload from './useDownload'
import testHook from '../../../test/test-hook'

jest.useFakeTimers()

jest.mock('file-saver')

let mockUseDownload
describe('useDownload', () => {
  beforeEach(() => {
    testHook(() => {
      mockUseDownload = useDownload('name')
    })
  })

  it('should have a downloadFile function', () => {
    const [, downloadFile] = mockUseDownload

    expect(downloadFile).toBeInstanceOf(Function)
  })

  it('should have correct initial values', () => {
    const [loading] = mockUseDownload

    expect(loading).toBe(false)
  })

  it('should set the loading state back to false downloadFile is called', () => {
    const [loading, downloadFile] = mockUseDownload

    expect(loading).toBe(false)

    act(() => {
      downloadFile('test')
    })

    expect(loading).toBe(false)
  })
})
