import reducer from './catalog';
import { routing } from '../../../app/routes';

describe('Catalog Reducer', () => {
  it('should set the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should set the detail id from a route change', () => {
    const id = '123foo';
    const result = reducer({}, { type: routing.catalogusDetail.type, payload: { id } });
    expect(result.detail).toBe(id);
  });
});
