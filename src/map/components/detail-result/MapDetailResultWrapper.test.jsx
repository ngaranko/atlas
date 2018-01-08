import React from 'react';
import { shallow } from 'enzyme';

import MapDetailResultWrapper
  from './MapDetailResultWrapper';

describe('MapDetailResultWrapper', () => {
  it('should render everything', () => {
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl="panoUrl"
        title="title"
        subTitle="subTitle"
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </MapDetailResultWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render empty panoUrl', () => {
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        subTitle="subTitle"
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </MapDetailResultWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render empty sub title', () => {
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        subTitle=""
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </MapDetailResultWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render missing sub title', () => {
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </MapDetailResultWrapper>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render missing children', () => {
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
