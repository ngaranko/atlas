import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenBouwblok from './MapDetailGebiedenBouwblok';

describe('MapDetailGebiedenBouwblok', () => {
  it('should render everything', () => {
    const bouwblok = {
      label: 'Bouwblok label'
    };
    const wrapper = shallow(
      <MapDetailGebiedenBouwblok
        panoUrl="panoUrl"
        bouwblok={bouwblok}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
