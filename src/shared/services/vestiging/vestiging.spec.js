import * as vestiging from './vestiging';
import { getAuthHeaders } from '../auth/auth';

jest.mock('../auth/auth');

describe('The vestiging resource', () => {
  beforeEach(() => {
    getAuthHeaders.mockImplementation(() => ({
      Authorization: 'Bearer 123AccessToken'
    }));
  });

  afterEach(() => {
    fetch.mockReset();
  });

  it('can fetch a vestiging by pand id', () => {
    fetch.mockResponseOnce(JSON.stringify({ results: [
      {
        _display: 'Vestiging display name 1',
        id: 'abc123'
      }, {
        _display: 'Vestiging display name 2',
        id: 'xyz456'
      }
    ] }));

    vestiging.fetchByPandId(1).then((response) => {
      expect(response
      ).toEqual([
        {
          _display: 'Vestiging display name 1',
          id: 'abc123'
        }, {
          _display: 'Vestiging display name 2',
          id: 'xyz456'
        }
      ]);
    });

    expect(fetch.mock.calls[0][0]).toContain('pand=1');
  });

  it('can fetch a vestiging by address id', () => {
    fetch.mockResponseOnce(JSON.stringify({ results: [
      {
        _display: 'Vestiging display name 1',
        id: 'abc123'
      }, {
        _display: 'Vestiging display name 2',
        id: 'xyz456'
      }
    ] }));

    vestiging.fetchByAddressId(0).then((response) => {
      expect(response
      ).toEqual([
        {
          _display: 'Vestiging display name 1',
          id: 'abc123'
        }, {
          _display: 'Vestiging display name 2',
          id: 'xyz456'
        }
      ]);
    });

    expect(fetch.mock.calls[0][0]).toContain('nummeraanduiding=0');
  });
});
