/*
    TODO:
    move all the logic from
    modules/atlas/services/redux/reducers/filters-reducers.factory.js to here
 */

const emptyFilters = () =>
  ({
    type: {
      id: 'EMPTY_FILTERS'
    }
  });

export default emptyFilters;
