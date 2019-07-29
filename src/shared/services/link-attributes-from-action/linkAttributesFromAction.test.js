import { selectLocationState } from 'redux-first-router'
import toUrl from 'redux-first-router-link/dist/toUrl'

import linkAttributesFromAction, {
  withPreventDefault,
} from './linkAttributesFromAction'

jest.mock('redux-first-router')
jest.mock('redux-first-router-link/dist/toUrl')

describe('withPreventDefault', () => {
  let testFn
  beforeEach(() => {
    testFn = jest.fn(() => {
      return jest.fn()
    })
  })

  it('should open in new tab when not ctrl or meta key pressed', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    }
    withPreventDefault(testFn)(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(testFn).toHaveBeenCalled()
  })

  it('should ignore the event when ctrl or meta key pressed', () => {
    const mockEvent = {
      metaKey: 10,
      preventDefault: jest.fn(),
    }
    withPreventDefault(testFn)(mockEvent)
    expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    expect(testFn).not.toHaveBeenCalled()
  })
})

describe('linkAttributesFromAction', () => {
  it('should create the linkAttributesFromAction ', () => {
    window.reduxStore = {
      getState: jest.fn(),
      dispatch: jest.fn(),
    }

    selectLocationState.mockReturnValueOnce(() => {})
    toUrl.mockReturnValueOnce(() => {})

    const result = linkAttributesFromAction()
    expect(result.href).toBeTruthy()
    expect(result.onClick).toBeTruthy()

    result.onClick({ preventDefault: jest.fn() })
    expect(window.reduxStore.dispatch).toHaveBeenCalledTimes(1)
  })
})
