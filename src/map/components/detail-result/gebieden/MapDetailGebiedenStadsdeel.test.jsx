import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenStadsdeel from './MapDetailGebiedenStadsdeel';

describe('MapDetailGebiedenStadsdeel', () => {
  describe('rendering', () => {
    it('should render everything', () => {
      const stadsdeel = {
        label: 'Stadsdeel label'
      };
      const wrapper = shallow(
        <MapDetailGebiedenStadsdeel
          panoUrl="panoUrl"
          stadsdeel={stadsdeel}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
