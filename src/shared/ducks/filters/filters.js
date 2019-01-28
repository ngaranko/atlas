/*
    TODO:
    move all the logic from
    src/reducers/deprecated/filters-reducers.js
    to here
 */

const emptyFilters = () =>
  ({
    type: {
      id: 'EMPTY_FILTERS'
    }
  });

export default emptyFilters;
