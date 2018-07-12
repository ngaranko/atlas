import React from 'react';
import { shallow } from 'enzyme';

import MapDetailNapPeilmerk from './MapDetailNapPeilmerk';

describe('MapDetailNapPeilmerk', () => {
  it('should render everything', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: 123.32313,
      label: 'Peilmerk label',
      year: 1919,
      windDirection: 'W',
      wallCoordinates: [2, 3]
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render empty height', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: null,
      label: 'Peilmerk label',
      year: 1919
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render without height', () => {
    const peilmerk = {
      description: 'Peilmerk description',
      height: null,
      label: 'Peilmerk label',
      year: 1919
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailNapPeilmerk
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        peilmerk={peilmerk}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
