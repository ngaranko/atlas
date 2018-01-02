const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

const initialState = {};

export default function ErrorMessageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_ERROR_MESSAGE:
      return {};

    default:
      return !action.error ? state : {
        name: action.error.name,
        message: action.error.message
      };
  }
}

export const resetErrorMessage = () => ({ type: RESET_ERROR_MESSAGE });

window.reducers = window.reducers || {};
window.reducers.ErrorMessageReducer = ErrorMessageReducer;
