export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_SCOPES = 'USER_SCOPES';
export const USER_NAME = 'USER_NAME';

const initialState = {
  authenticated: false,
  scopes: {},
  name: ''
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: action.authenticated
        }
      };

    case 'USER_SCOPES':
      return {
        ...state,
        user: {
          ...state.user,
          scopes: action.scopes.reduce((acc, scope) => {
            acc[scope] = true;
            return acc;
          }, {})
        }
      };

    case 'USER_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name
        }
      };

    default:
      return state;
  }
};

window.UserReducer = UserReducer;
