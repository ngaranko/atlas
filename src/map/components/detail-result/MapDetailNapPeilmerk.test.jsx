import React from 'react';
import { shallow } from 'enzyme';

import MapDetailNapPeilmerk from './MapDetailNapPeilmerk';

describe('MapDetailNapPeilmerk', () => {
  it('should render everything', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: '123',
      label: 'Peilmerk label',
      year: 1919
    };
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={() => ({})}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render empty height', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: '',
      label: 'Peilmerk label',
      year: 1919
    };
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={() => ({})}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render without height', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: '',
      label: 'Peilmerk label',
      year: 1919
    };
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={() => ({})}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
