import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenStandplaats from './MapDetailAdressenStandplaats';

describe('MapDetailAdressenStandplaats', () => {
  it('should render everything', () => {
    const standplaats = {
      label: 'Standplaats label',
      status: 'Standplaats status'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenStandplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        standplaats={standplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
