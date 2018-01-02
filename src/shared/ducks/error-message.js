const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';

export const ERROR_TYPES = {
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

const initialState = {
  hasErrors: false,
  types: {}
};

export default function ErrorMessageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ERROR_MESSAGE:
      return initialState;

    case SET_GLOBAL_ERROR:
      return {
        ...state,
        hasErrors: true,
        types: {
          ...state.types,
          [action.payload]: true
        }
      };
    default:
      return state;
  }
}

export const resetErrorMessage = () => ({ type: RESET_ERROR_MESSAGE });
export const setGlobalError = (errorType) => ({ type: SET_GLOBAL_ERROR, payload: errorType });

window.reducers = window.reducers || {};
window.reducers.ErrorMessageReducer = ErrorMessageReducer;
