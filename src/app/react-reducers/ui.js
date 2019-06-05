export const REDUCER_KEY = 'ui';
export const SET_BACKDROP = `${REDUCER_KEY}/SET_BACKDROP`;

export const initialState = {
  backdropEnabled: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BACKDROP:
      return {
        ...state,
        backdropEnabled: action.payload
      };

    default:
      return state;
  }
};

export const actions = {
  setBackDrop: SET_BACKDROP
};

