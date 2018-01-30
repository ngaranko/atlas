import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenGebiedsgerichtWerken from './MapDetailGebiedenGebiedsgerichtWerken';

describe('MapDetailGebiedenGebiedsgerichtWerken', () => {
  it('should render everything', () => {
    const gebiedsgerichtWerken = {
      label: 'Gebiedsgericht werken label'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailGebiedenGebiedsgerichtWerken
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        gebiedsgerichtWerken={gebiedsgerichtWerken}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
