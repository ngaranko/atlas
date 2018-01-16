import { categoryTypeOrder } from '../../services/map-search';

export const FETCH_MAP_SEARCH_RESULTS_REQUEST = 'FETCH_MAP_SEARCH_RESULTS_REQUEST';
export const FETCH_MAP_SEARCH_RESULTS_SUCCESS = 'FETCH_MAP_SEARCH_RESULTS_SUCCESS';
export const FETCH_MAP_SEARCH_RESULTS_FAILURE = 'FETCH_MAP_SEARCH_RESULTS_FAILURE';

const initialState = {
  mapSearchResultsByLocation: {},
  isLoading: false,
  mapSearchResultsError: null
};

export default function MapSearchResultsReducer(state = initialState, action) {
  const locationId = Object
    .keys(action.location)
    .map((key) => action.location[key])
    .toString();

  switch (action.type) {
    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return { ...state, isLoading: true, mapSearchResultsError: null };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mapSearchResultsByLocation: {
          ...state.mapSearchResultsByLocation,
          [locationId]: action.mapSearchResults
        }
      };

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}

export const selectLatestMapSearchResults = (state) =>
  state.search && state.search.location &&
  state.mapSearchResultsByLocation[state.search.location];

export const getMapSearchResults = (location, user) => ({
  type: FETCH_MAP_SEARCH_RESULTS_REQUEST,
  location,
  user
});

export const sortByCategoryTypeOrder = (items) => items
  .map((item) => item).sort((a, b) => {
    const indexA = categoryTypeOrder.indexOf(a.type);
    const indexB = categoryTypeOrder.indexOf(b.type);
    return indexA < indexB ? -1 :
      (indexA > indexB ? 1 : 0);
  });


export const getPreviewPanelResults = (state) => {
  const results = selectLatestMapSearchResults(state) || [];
  // Filter non pand monumenten if search result is pand
  const isPand = results.some((feature) => feature.type === 'bag/pand');
  const filteredResults = isPand
    ? results.filter((feature) => feature.type !== 'monumenten/monument')
    : results;

  const filterResultsByCategory = (items, category) => items
  .filter((item) => item.categoryLabel === category)
  .filter((item, index) => index < 3);

  const createDataModel = (resultList, isSubCategory) => resultList
  .reduce((items, currentValue) => {
    if (!items.some((item) => item.categoryLabel === currentValue.categoryLabel)) {
      if (!currentValue.parent || isSubCategory) {
        const subCategories = filteredResults.filter((subCategory) =>
          subCategory.parent === currentValue.type);
        items.push({
          categoryLabel: currentValue.categoryLabel,
          subCategoryItems: subCategories && subCategories.length ?
            createDataModel(subCategories, true) : [],
          results: sortByCategoryTypeOrder(
           filterResultsByCategory(filteredResults, currentValue.categoryLabel)),
          showMore: filterResultsByCategory(filteredResults,
            currentValue.categoryLabel).length === 3
        });
      }
    }
    return items;
  }, []);

  return createDataModel(sortByCategoryTypeOrder(filteredResults));
};

window.reducers = window.reducers || {};
window.reducers.MapSearchResultsReducer = MapSearchResultsReducer;
