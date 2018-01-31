import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenStandplaats from './MapDetailAdressenStandplaats';

describe('MapDetailAdressenStandplaats', () => {
  it('should render everything', () => {
    const standplaats = {
      label: 'Standplaats label',
      status: { description: 'description' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenStandplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        standplaats={standplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
