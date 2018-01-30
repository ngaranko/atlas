import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenLigplaats from './MapDetailAdressenLigplaats';

describe('MapDetailAdressenLigplaats', () => {
  it('should render everything', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: 'Ligplaats status'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
