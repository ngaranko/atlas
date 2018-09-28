import { getCurrentPage } from '../app/routes';

const currentPageReducer = (state = { type: 'home', variant: null }, action = {}) => (
  getCurrentPage(action.type) ?
    { type: getCurrentPage(action.type), variant: action.payload.variant } :
    state
);

export default currentPageReducer;
