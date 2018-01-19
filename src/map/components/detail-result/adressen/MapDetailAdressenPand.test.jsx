import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenPand from './MapDetailAdressenPand';

describe('MapDetailAdressenPand', () => {
  it('should render everything', () => {
    const pand = {
      label: 'Pand label',
      status: 'Pand status',
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

  it('should render unknown for empty year', () => {
    const pand = {
      label: 'Pand label',
      status: 'Pand status',
      year: ''
    };
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        pand={pand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unknown without year', () => {
    const pand = {
      label: 'Pand label',
      status: 'Pand status'
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
