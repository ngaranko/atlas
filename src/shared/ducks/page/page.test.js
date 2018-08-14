import reducer, { SET_PAGE_NAME, setPageName } from './page';

describe('Page Reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toEqual({
      name: null
    });
  });

  it(`should set the state to null when ${SET_PAGE_NAME} is dispatched`, () => {
    expect(reducer(state, setPageName({
      name: 'A Name'
    }))).toEqual({
      name: 'A Name'
    });
  });
});
