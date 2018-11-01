import reducer, {
  getStraatbeeld,
  getStraatbeeldHeading,
  getStraatbeeldLocation,
  getStraatbeeldMarkers,
  fetchStraatbeeldSuccess,
  setStraatbeeldYear, fetchStraatbeeld, setStraatbeeldOrientation
} from './straatbeeld';
import * as STRAATBEELD_CONFIG from '../../../../modules/straatbeeld/straatbeeld-config';

describe('Straatbeeld Reducer', () => {
  beforeAll(() => {
    STRAATBEELD_CONFIG.default = {
      DEFAULT_FOV: 79
    };
  });

  it('should set the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      date: null,
      fov: null,
      heading: 0,
      hotspots: [],
      image: null,
      isLoading: true,
      location: null,
      pitch: 0,
      year: undefined
    });
  });

  describe('fetchStraatbeeldById', () => {
    it('when heading is not in payload, use oldstate heading', () => {
      const inputState = {
        fov: 1,
        pitch: 2,
        date: 'today',
        heading: 179,
        hotspots: ['a', 'b'],
        location: ['lat', 'lon'],
        image: 'http://example.com/example.png'
      };
      const id = 'ABC';
      const newState = reducer(inputState, fetchStraatbeeld(id));
      expect(newState.id).toBe(id);
      expect(newState.heading).toBe(inputState.heading);
    });
  });

  describe('setStraatbeeldYear', () => {
    it('sets the year', () => {
      expect(
        reducer({ year: 2010 }, setStraatbeeldYear(2020))
      ).toEqual({
        year: 2020
      });
    });
  });

  describe('setStraatbeeld', () => {
    const payload = {
      date: new Date('2016-05-19T13:04:15.341110Z'),
      hotspots: [{
        id: 'ABC',
        heading: 179,
        distance: 3
      }],
      location: [52, 4],
      image: {
        pattern: 'http://example.com/example/{this}/{that}/{whatever}.png',
        preview: 'http://example.com/example/preview.png'
      }
    };

    let inputState;
    beforeEach(() => {
      inputState = {
        isLoading: true,
        id: 'ABC',
        heading: 123
      };
    });

    it('Adds the payload to the state', () => {
      const newState = reducer(inputState, fetchStraatbeeldSuccess(payload));
      expect(newState).toEqual(jasmine.objectContaining(payload));
    });

    it('set defaults for pitch, fov when oldstate is unknown', () => {
      const newState = reducer(inputState, fetchStraatbeeldSuccess(payload));
      expect(newState.pitch).toBe(0);
      expect(newState.fov).toBe(80);
    });

    it('set Pitch and fov to output when oldstate is known', () => {
      inputState.pitch = 1;
      inputState.fov = 2;

      const newState = reducer(inputState, fetchStraatbeeldSuccess(payload));
      expect(newState.pitch).toBe(1);
      expect(newState.fov).toBe(2);
    });

    it('Sets loading to false', () => {
      const output = reducer(inputState, fetchStraatbeeldSuccess(payload));
      expect(output.isLoading).toBe(false);
    });
  });

  describe('setStraatbeeldOrientation', () => {
    it('updates the orientation', () => {
      const inputState = {
        pitch: 1,
        fov: 2
      };
      const payload = {
        heading: 91,
        pitch: 1,
        fov: 2
      };
      const output = reducer(inputState, setStraatbeeldOrientation(payload));

      expect(output.heading)
        .toEqual(payload.heading);
      expect(output.pitch)
        .toEqual(payload.pitch);
      expect(output.fov)
        .toEqual(payload.fov);
    });
  });
});

// SELECTORS
describe('straatbeeld selectors', () => {
  const straatbeeld = {
    location: [10, 10],
    heading: -134
  };
  describe('getStraatbeeld', () => {
    it('should return straatbeeld from the state', () => {
      const selected = getStraatbeeld({ straatbeeld });
      expect(selected).toEqual(straatbeeld);
    });
  });

  describe('getStraatbeeldLocation', () => {
    it('should return the location from the straatbeeld', () => {
      const selected = getStraatbeeldLocation.resultFunc(straatbeeld);
      expect(selected).toEqual(straatbeeld.location);
    });

    it('should return an empty string if straatbeeld is empty', () => {
      const selected = getStraatbeeldLocation.resultFunc('');
      expect(selected).toEqual('');
    });
  });

  describe('getStraatbeeldHeading', () => {
    it('should return the location from the straatbeeld', () => {
      const selected = getStraatbeeldHeading.resultFunc(straatbeeld);
      expect(selected).toEqual(straatbeeld.heading);
    });
  });

  describe('getStraatbeeldMarkers', () => {
    const { location, heading } = straatbeeld;
    it('should return an array of with 2 markers', () => {
      const selected = getStraatbeeldMarkers.resultFunc(location, heading);
      expect(selected).toEqual([
        {
          position: location,
          type: 'straatbeeldOrientationType',
          heading
        },
        {
          position: location,
          type: 'straatbeeldPersonType'
        }
      ]);
    });

    it('should return an empty array if there is no location', () => {
      const selected = getStraatbeeldMarkers.resultFunc('', heading);
      expect(selected).toEqual([]);
    });

    it('should return an array of with 2 markers with a default heading of 0 if there is no heading', () => {
      const selected = getStraatbeeldMarkers.resultFunc(location, '');
      expect(selected).toEqual([
        {
          position: location,
          type: 'straatbeeldOrientationType',
          heading: 0
        },
        {
          position: location,
          type: 'straatbeeldPersonType'
        }
      ]);
    });
  });
});
