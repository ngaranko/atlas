import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenPand from './MapDetailAdressenPand';

describe('MapDetailAdressenPand', () => {
  describe('rendering', () => {
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
  });
});
