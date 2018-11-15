import { preserveQuery } from './redux-first-router';

describe('redux first router', () => {
  it('should preserve the current query when creating new route actions', () => {
    window.history.pushState({}, 'Test Title', '?abc=xyz&zoom=10');
    const action = {
      type: 'FOO',
      payload: 'bar'
    };
    expect(preserveQuery(action)).toEqual({
      ...action,
      meta: {
        query: {
          abc: 'xyz',
          zoom: '10'
        }
      }
    });
  });
});
