import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapWrapper from './MapWrapper';

describe('MapWrapper', () => {
  it('should render', () => {
    const store = configureMockStore()({});
    global.reduxStore = store;
    const wrapper = shallow(<MapWrapper />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
