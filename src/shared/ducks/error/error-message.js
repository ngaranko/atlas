import { createSelector } from 'reselect'

export const REDUCER_KEY = 'error'

const RESET_GLOBAL_ERROR = `${REDUCER_KEY}/RESET_GLOBAL_ERROR`
const SET_GLOBAL_ERROR = `${REDUCER_KEY}/SET_GLOBAL_ERROR`

export const ERROR_TYPES = {
  GENERAL_ERROR: 'GENERAL_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
}

export const ERROR_MESSAGES = {
  [ERROR_TYPES.GENERAL_ERROR]:
    'Momenteel wordt niet alle informatie getoond. Aan deze technische ' +
    'storing wordt gewerkt. Probeer het zodadelijk nog eens…',
  [ERROR_TYPES.NOT_FOUND_ERROR]: 'Deze informatie is niet beschikbaar. Dit is reeds teruggemeld.',
}

const initialState = {
  hasErrors: false,
  types: {},
  suppressed: {},
}

export default function ErrorMessageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_GLOBAL_ERROR:
      return initialState

    case SET_GLOBAL_ERROR:
      return {
        ...state,
        hasErrors: true,
        types: {
          ...state.types,
          [action.payload]: true,
        },
      }
    default:
      return state
  }
}

export const resetGlobalError = () => ({ type: RESET_GLOBAL_ERROR })
export const setGlobalError = errorType => ({
  type: SET_GLOBAL_ERROR,
  payload: errorType,
})

const getErrorState = state => state.error

// Reducer need to be refactored if it's not used by angular modules to avoid unnecessary complexity
// like this.
export const getMessage = createSelector(
  getErrorState,
  error =>
    ERROR_MESSAGES[Object.entries(error.types).map(([type, value]) => value && type)[0]] ||
    ERROR_MESSAGES[ERROR_TYPES.GENERAL_ERROR],
)
export const hasGlobalError = createSelector(getErrorState, error => error.hasErrors)
