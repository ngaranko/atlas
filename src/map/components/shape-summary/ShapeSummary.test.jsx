import React from 'react';
import { shallow } from 'enzyme';

import ShapeSummary from './ShapeSummary';

describe('ShapeSummary', () => {
  describe('actions', () => {
    it('should trigger toggle drawing on when clicked with zero markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={2}
          shapeDistanceTxt="23,45 km"
          onClearDrawing={onClearDrawing}
        />
      );
      wrapper.find('button').at(0).simulate('click');
      expect(onClearDrawing).toHaveBeenCalled();
    });
  });

  describe('rendering', () => {
    it('should render empty with 0 markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={0}
          shapeDistanceTxt=""
          onClearDrawing={onClearDrawing}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render empty with 0 markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={0}
          shapeDistanceTxt=""
          onClearDrawing={onClearDrawing}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render empty with 1 markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={1}
          shapeDistanceTxt=""
          onClearDrawing={onClearDrawing}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render info with 2 markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={2}
          shapeDistanceTxt="23,45 km"
          onClearDrawing={onClearDrawing}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render empty with more than 2 markers', () => {
      const onClearDrawing = jest.fn();
      const wrapper = shallow(
        <ShapeSummary
          shapeMarkers={42}
          shapeDistanceTxt=""
          onClearDrawing={onClearDrawing}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
