
import {
    getCurrentLocation,
    panTo
} from './panControls';

describe('zoom controls', () => {
  let leafletMap;
  const mockCenter = {
    lat: 1.3,
    lng: 3.7
  };

  beforeEach(() => {
    leafletMap = {
      getCenter: () => mockCenter,
      panTo: jest.fn()
    };
  });


  it('exposes the getCurrentLocation function', () => {
    expect(getCurrentLocation(leafletMap)).toEqual(Object.values(mockCenter));
  });


  it('can pan to a location', () => {
    const newLocation = [1.2, 3.4];

    panTo(leafletMap, newLocation);

    expect(leafletMap.panTo.mock.calls[0][0]).toBe(newLocation);
    expect(leafletMap.panTo.mock.calls[0][1]).toEqual({ animate: false });
  });

  it('prevents infinite loops; it won\'t fire if the new location is equal to the current location', () => {
    panTo(leafletMap, Object.values(mockCenter));

    expect(leafletMap.panTo.mock.calls.length).toBe(0);
  });
});
