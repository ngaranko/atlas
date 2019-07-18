import ErrorMessageReducer, {
  setGlobalError,
  resetGlobalError,
  hasGlobalError,
} from './error-message'

let initialState

describe('The error message reducer', () => {
  beforeEach(() => {
    initialState = ErrorMessageReducer(undefined, {})
  })

  it('does nothing by default', () => {
    expect(ErrorMessageReducer(initialState, {})).toEqual(initialState)
  })

  it('adds the error to the state', () => {
    expect(ErrorMessageReducer(initialState, setGlobalError('foo'))).toEqual({
      hasErrors: true,
      types: {
        foo: true,
      },
      suppressed: {},
    })
  })

  it('can reset the error message state', () => {
    expect(
      ErrorMessageReducer(
        {
          foo: 'bar',
        },
        resetGlobalError(),
      ),
    ).toEqual(initialState)
  })

  it('should return if the global state has errors', () => {
    expect(hasGlobalError({ error: initialState })).toEqual(
      initialState.hasErrors,
    )
  })
})
