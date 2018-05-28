import { getDataSelection, getClusterMarkers, getDrawShape } from './data-selection';

describe('Data selection selectors', () => {
  const mockParameters = {
    dataSelection: {
      dataset: 'bag',
      markers: [
        [50000, 50000],
        [60000, 60000],
        [70000, 70000]
      ],
      geometryFilter: {
        markers: [
          [50000, 50000],
          [60000, 60000]
        ]
      }
    }
  };

  describe('getDataSelection', () => {
    it('should return dataSelection', () => {
      const selected = getDataSelection(mockParameters);
      expect(selected).toBe(mockParameters.dataSelection);
    });

    it('should return undefined', () => {
      const selected = getDataSelection({});
      expect(selected).toBe();
    });
  });

  describe('getClusterMarkers', () => {
    it('should return an array with markers', () => {
      const selected = getClusterMarkers.resultFunc(mockParameters.dataSelection);
      expect(Array.isArray(selected)).toBe(true);
      selected.forEach((item, index) => {
        expect(item).toEqual({
          index,
          position: mockParameters.dataSelection.markers[index],
          type: 'detailPointType'
        });
      });
    });

    it('should return an array with markers', () => {
      const selected = getClusterMarkers.resultFunc({
        ...mockParameters.dataSelection,
        markers: []
      });
      expect(Array.isArray(selected)).toBe(true);
      expect(selected.length).toBe(0);
    });
  });

  describe('getDrawShape', () => {
    it('should return an object with a latLngList', () => {
      const selected = getDrawShape.resultFunc(
        mockParameters.dataSelection,
        mockParameters.dataSelection.geometryFilter.markers
      );
      expect(selected).toEqual(
        { latLngList: [[50000, 50000], [60000, 60000]] }
      );
    });
  });
});
