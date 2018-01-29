import React from 'react';
import { shallow } from 'enzyme';

import PointsAvailable from './PointsAvailable';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';

const maxMarkers = drawToolConfig.MAX_MARKERS;
const markersLeftWarning = drawToolConfig.MARKERS_LEFT_WARNING;
const mockMarkers = [];

mockMarkers.push(0);
mockMarkers.push(1);
mockMarkers.push(maxMarkers - markersLeftWarning - 1);
mockMarkers.push(maxMarkers - markersLeftWarning);
mockMarkers.push(maxMarkers - markersLeftWarning + 1);
mockMarkers.push(maxMarkers - 1);
mockMarkers.push(maxMarkers);

describe('PointsAvailable', () => {
  describe('rendering', () => {
    Object.values(drawToolConfig.DRAWING_MODE).forEach((drawingMode) => {
      mockMarkers.forEach((numberOfMarkers) => {
        it(`should render nothing with drawing mode ${drawingMode} and ${numberOfMarkers} markers`, () => {
          const wrapper = shallow(
            <PointsAvailable
              shapeMarkers={numberOfMarkers}
              drawingMode={drawingMode}
            />
          );
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});
