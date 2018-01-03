import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenGrootstedelijk from './MapDetailGebiedenGrootstedelijk';

describe('MapDetailGebiedenGrootstedelijk', () => {
  describe('rendering', () => {
    it('should render everything', () => {
      const grootstedelijk = {
        label: 'Grootstedelijk label'
      };
      const wrapper = shallow(
        <MapDetailGebiedenGrootstedelijk
          panoUrl="panoUrl"
          grootstedelijk={grootstedelijk}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
