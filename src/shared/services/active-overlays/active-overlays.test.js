import ActiveOverlays from './active-overlays';
import getState from '../redux/get-state';

jest.mock('../redux/get-state');

describe('ActiveOverlays', () => {
  describe('getOverlays', () => {
    it('should return an array with the active layers', () => {
      getState.mockImplementation(() => ({
        user: {},
        mapLayers: [{
          id: 'biz'
        }, {
          id: 2,
          legendItems: [{
            id: 'hvo'
          }],
          authScope: true
        }]
      }));
      ActiveOverlays.allOverlays = [{
        id: 'biz'
      }, {
        id: 'hvo'
      }];
      expect(ActiveOverlays.getOverlays()).toEqual([{
        id: 'biz'
      }]);
    });

    it('should return an empty array when mapLayers doesn\'t contain a id matching the allOverlays', () => {
      getState.mockImplementation(() => ({
        user: {},
        mapLayers: [{
          id: 'pir'
        }, {
          id: 2,
          legendItems: [{
            id: 'hvo'
          }],
          authScope: true
        }]
      }));
      ActiveOverlays.allOverlays = [{
        id: 'biz'
      }, {
        id: 'hvo'
      }];
      expect(ActiveOverlays.getOverlays()).toEqual([]);
    });
  });

  describe('getVisibleSources', () => {
    it('should return an empty array', () => {
      getState.mockImplementation(() => ({
        user: {},
        map: {
          zoom: 3
        },
        mapLayers: [{
          id: 'biz'
        }, {
          id: 2,
          legendItems: [{
            id: 'hvo'
          }],
          authScope: true
        }]
      }));
      ActiveOverlays.allOverlays = [{
        id: 'biz',
        isVisible: true
      }, {
        id: 'hvo'
      }];
      expect(ActiveOverlays.getVisibleSources('biz')).toEqual([]);
    });

    it('should filter', () => {
      getState.mockImplementation(() => ({
        user: {},
        map: {
          zoom: 3
        },
        mapLayers: [{
          id: 'biz'
        }, {
          id: 2,
          legendItems: [{
            id: 'hvo'
          }],
          authScope: true
        }]
      }));
      ActiveOverlays.allOverlays = [{
        id: 'biz',
        isVisible: true
      }, {
        id: 'hvo'
      }];
      ActiveOverlays.isVisibleAtCurrentZoom = jest.fn().mockReturnValue(true);
      expect(ActiveOverlays.getVisibleSources('biz')).toEqual([]);
    });
  });
});
