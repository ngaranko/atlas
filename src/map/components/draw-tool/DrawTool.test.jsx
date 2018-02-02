import React from 'react';
import { shallow } from 'enzyme';

import DrawTool from './DrawTool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';

describe('DrawTool', () => {
  let isEnabled;
  let defaultProps;

  beforeEach(() => {
    isEnabled = jest.fn();
    defaultProps = {
      isEnabled,
      toggleDrawing: jest.fn(),
      onClearDrawing: jest.fn(),
      drawingMode: drawToolConfig.DRAWING_MODE.NONE,
      shapeMarkers: 0,
      shapeDistanceTxt: ''
    };
  });

  it('should render points available, shape summary and toggle drawing', () => {
    const wrapper = shallow(<DrawTool {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render summary for 2 points', () => {
    isEnabled.mockImplementation(() => false);
    const wrapper = shallow((
      <DrawTool
        {...defaultProps}
        shapeMarkers={2}
      />
    ));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render points available almost max points drawn', () => {
    const wrapper = shallow((
      <DrawTool
        {...defaultProps}
        drawingMode={'bar'}
        shapeMarkers={10}
      />
    ));
    expect(wrapper).toMatchSnapshot();
  });
});
