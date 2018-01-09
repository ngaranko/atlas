import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenUnesco from './MapDetailGebiedenUnesco';

describe('MapDetailGebiedenUnesco', () => {
  it('should render everything', () => {
    const unesco = {
      label: 'Unesco label'
    };
    const wrapper = shallow(
      <MapDetailGebiedenUnesco
        panoUrl="panoUrl"
        unesco={unesco}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
