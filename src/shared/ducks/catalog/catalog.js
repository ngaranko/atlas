import get from 'lodash.get';
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
        query: get(action, 'meta.query.zoekterm')
      };
    default:
      return state;
  }
};

export const getCatalogQuery = (state) => state.catalog.query;
