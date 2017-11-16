const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

const initialState = {};

export default function ErrorMessageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ERROR_MESSAGE:
      return { ...state, error: null };

    default:
      if (action.error) {
        window.Raven.captureMessage(action.error);
      }

      return !action.error ? state : {
        ...state,
        error: {
          name: action.error.name,
          message: action.error.message
        }
      };
  }
}

export const resetErrorMessage = () => ({ type: RESET_ERROR_MESSAGE });

window.reducers = window.reducers || {};
window.reducers.ErrorMessageReducer = ErrorMessageReducer;
