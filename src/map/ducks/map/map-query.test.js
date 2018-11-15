import mapQuery from './map-query';
import * as mapSelectors from './map-selectors';

jest.mock('./map-selectors');

describe('Map query', () => {
  it('should wire the proper selectors of zoom, legenda, lat and lng queries', () => {
    mapQuery.lat.selector();
    mapQuery.lng.selector();
    mapQuery.zoom.selector();
    mapQuery.legenda.selector();

    expect(mapSelectors.getLatitude).toHaveBeenCalledTimes(1);
    expect(mapSelectors.getLongitude).toHaveBeenCalledTimes(1);
    expect(mapSelectors.getMapZoom).toHaveBeenCalledTimes(1);
    expect(mapSelectors.isMapPanelActive).toHaveBeenCalledTimes(1);
  });

  describe('overlay query selector', () => {
    it('should return an empty string if there no overlays', () => {
      mapSelectors.getMapOverlays.mockReturnValue([]);
      expect(mapQuery.lagen.selector()).toEqual('');
    });

    it('should convert an array of layers to a pipe seperated string', () => {
      mapSelectors.getMapOverlays.mockReturnValue([{ id: 'bag', isVisible: true }, {
        id: 'beg',
        isVisible: false
      }]);
      expect(atob(mapQuery.lagen.selector())).toEqual('bag:1|beg:0');
    });
  });
});
