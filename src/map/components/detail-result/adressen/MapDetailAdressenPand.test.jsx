import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenPand from './MapDetailAdressenPand';

describe('MapDetailAdressenPand', () => {
  it('should render everything', () => {
    const pand = {
      label: 'Pand label',
      status: {
        ommschrijving: 'Pand status',
        code: '31'
      },
      year: '2020'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unknown for empty year', () => {
    const pand = {
      label: 'Pand label',
      status: {
        ommschrijving: 'Pand status',
        code: '31'
      },
      year: ''
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unknown without year', () => {
    const pand = {
      label: 'Pand label',
      status: {
        ommschrijving: 'Pand status',
        code: '31'
      }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
