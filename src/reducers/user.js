export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

const initialState = {
  authenticated: false,
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
          scopes: action.scopes,
          name: action.name
        }
      };

    default:
      return state;
  }
};

export const authenticateUser = (name, scopes) => ({ type: AUTHENTICATE_USER, name, scopes });

window.UserReducer = UserReducer;
