import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapContainer from './MapContainer';

let initialState;

describe('MapContainer', () => {
  beforeEach(() => {
    initialState = {
      ui: {
        isMapFullscreen: false
      }
    };
  });

  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(<MapContainer />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
