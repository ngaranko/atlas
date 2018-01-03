import React from 'react';
import { shallow } from 'enzyme';

import MapDetailMonument from './MapDetailMonument';

describe('MapDetailMonument', () => {
  describe('rendering', () => {
    it('should render everything', () => {
      const monument = {
        label: 'Monument label',
        number: 123456,
        status: 'Monument status',
        type: 'Monument type'
      };
      const wrapper = shallow(
        <MapDetailMonument
          panoUrl="panoUrl"
          monument={monument}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
