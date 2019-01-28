import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenBuurt from './MapDetailGebiedenBuurt';

describe('MapDetailGebiedenBuurt', () => {
  it('should render everything', () => {
    const buurt = {
      label: 'Buurt label',
      volledigeCode: 'A'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailGebiedenBuurt
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        buurt={buurt}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
