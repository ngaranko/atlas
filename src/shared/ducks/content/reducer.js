import { initialState, REDUCER_KEY, SET_ITEM } from './constants';

export { REDUCER_KEY as CONTENT };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        item: action.payload
      };

    default:
      return state;
  }
}
