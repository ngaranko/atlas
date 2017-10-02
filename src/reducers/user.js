export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_SCOPES = 'USER_SCOPES';

const initialState = {
  authenticated: false,
  scopes: {}
};

export default function UserReducer(state = {}, action) {
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

    default:
      return state;
  }
};

window.UserReducer = UserReducer;
