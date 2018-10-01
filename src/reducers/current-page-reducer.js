import { getCurrentPage } from '../app/routes';
import PAGES from '../app/pages';

const currentPageReducer = (state = { type: PAGES.HOME, variant: null }, action = {}) => (
  getCurrentPage(action.type) ?
    { type: getCurrentPage(action.type), variant: action.payload.variant } :
    state
);

export default currentPageReducer;
