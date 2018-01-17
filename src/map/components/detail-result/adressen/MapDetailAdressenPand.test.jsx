import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenPand from './MapDetailAdressenPand';

describe('MapDetailAdressenPand', () => {
  it('should render everything', () => {
    const pand = {
      label: 'Pand label',
      status: {
        ommschrijving: 'Pand status',
        code: '31'
      },
      year: '2020'
    };
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        pand={pand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
