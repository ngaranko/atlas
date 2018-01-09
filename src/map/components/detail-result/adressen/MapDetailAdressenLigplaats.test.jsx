import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenLigplaats from './MapDetailAdressenLigplaats';

describe('MapDetailAdressenLigplaats', () => {
  it('should render everything', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: 'Ligplaats status'
    };
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
