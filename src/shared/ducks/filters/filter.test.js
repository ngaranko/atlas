import reducer, { applyFilters, emptyFilters } from './filters';

describe('The filtersReducers', () => {
  it('APPLY FILTERS saves the current filters', () => {
    const filter = {
      filter: 'this'
    };

    expect(reducer({}, applyFilters(filter))).toEqual(filter);
  });

  it('EMPTY FILTERS saves the current filters', () => {
    const state = {
      myfilter: 'something'
    };

    expect(reducer(state, emptyFilters())).toEqual({});
  });
});
