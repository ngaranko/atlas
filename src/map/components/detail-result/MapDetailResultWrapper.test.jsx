import React from 'react';
import { shallow } from 'enzyme';

import MapDetailResultWrapper
  from './MapDetailResultWrapper';

describe('MapDetailResultWrapper', () => {
  it('should render everything', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl="panoUrl"
        title="title"
        subTitle="subTitle"
        onMaximize={clickHandler}
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
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        subTitle="subTitle"
        onMaximize={clickHandler}
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
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        subTitle=""
        onMaximize={clickHandler}
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
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        onMaximize={clickHandler}
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
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailResultWrapper
        panoUrl=""
        title="title"
        onMaximize={clickHandler}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
