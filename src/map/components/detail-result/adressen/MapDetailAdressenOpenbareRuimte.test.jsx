import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenOpenbareRuimte from './MapDetailAdressenOpenbareRuimte';

describe('MapDetailAdressenOpenbareRuimte', () => {
  describe('rendering', () => {
    it('should render everything', () => {
      const openbareRuimte = {
        label: 'Openbare ruimte label',
        status: 'Openbare ruimte status',
        type: 'Openbare ruimte type'
      };
      const wrapper = shallow(
        <MapDetailAdressenOpenbareRuimte
          panoUrl="panoUrl"
          openbareRuimte={openbareRuimte}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
