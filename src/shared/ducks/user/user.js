export const REDUCER_KEY = 'user';
export const AUTHENTICATE_USER = `${REDUCER_KEY}/AUTHENTICATE_USER`;
export const AUTHENTICATE_ERROR = `${REDUCER_KEY}/AUTHENTICATE_ERROR`;

const initialState = {
  authenticated: false,
  accessToken: '',
  scopes: [],
  name: '',
  error: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true,
        accessToken: action.accessToken,
        name: action.name,
        scopes: action.scopes
      };

    case AUTHENTICATE_ERROR:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
}

export const getUser = (state) => state[REDUCER_KEY];

export const authenticateUser = (accessToken, name, scopes) =>
  ({ type: AUTHENTICATE_USER, accessToken, name, scopes });

export const authenticateError = () => ({ type: AUTHENTICATE_ERROR });
