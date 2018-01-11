import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenGebiedsgerichtWerken from './MapDetailGebiedenGebiedsgerichtWerken';

describe('MapDetailGebiedenGebiedsgerichtWerken', () => {
  it('should render everything', () => {
    const gebiedsgerichtWerken = {
      label: 'Gebiedsgericht werken label'
    };
    const wrapper = shallow(
      <MapDetailGebiedenGebiedsgerichtWerken
        panoUrl="panoUrl"
        gebiedsgerichtWerken={gebiedsgerichtWerken}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
