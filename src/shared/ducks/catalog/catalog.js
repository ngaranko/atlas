import { routing } from '../../../app/routes';

const initialState = {
  endpoint: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case routing.catalogusDetail.type:
      return {
        detail: action.payload.id
      };
    case routing.searchCatalog.type:
      return {
        query: action.payload.query
      };
    default:
      return state;
  }
};
