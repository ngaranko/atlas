export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

const initialState = {
  authenticated: false,
  accessToken: '',
  scopes: [],
  name: ''
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: true,
          accessToken: action.accessToken,
          name: action.name,
          scopes: action.scopes
        }
      };

    default:
      return state;
  }
};

export const authenticateUser = (accessToken, name, scopes) =>
  ({ type: AUTHENTICATE_USER, accessToken, name, scopes });

window.UserReducer = UserReducer;
