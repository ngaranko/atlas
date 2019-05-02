import fetchPano from './panorama-preview';
import { getByUrl } from '../../../shared/services/api/api';

jest.mock('../../../shared/services/api/api');

describe('panoPreview service', () => {
  it('should return an object filled with data if response is ok', () => {
    getByUrl.mockReturnValueOnce(Promise.resolve({
      pano_id: 'pano_id',
      heading: 'heading',
      url: 'url'
    }));
    fetchPano({ latitude: 123, longitude: 321 }).then((res) => {
      expect(res).toEqual({
        id: 'pano_id',
        heading: 'heading',
        url: 'url'
      });
    });
    expect(getByUrl).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/panorama/thumbnail/?lat=123&lon=321&width=438&radius=180');
  });

  it('should return an empty object when status is 404', () => {
    getByUrl.mockReturnValueOnce(Promise.resolve({}));
    fetchPano({ latitude: 123, longitude: 321 }).then((res) => {
      expect(res).toEqual({});
    });
  });

  it('should throw an error is response != ok and status != 404', async () => {
    const error = new Error('Error requesting a panoramic view');
    getByUrl.mockReturnValueOnce(Promise.reject(error));

    await expect(fetchPano({
      latitude: 123,
      longitude: 321
    })).rejects.toEqual(error);
  });
});
