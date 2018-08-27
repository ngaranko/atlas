import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import HomepageAddressBlockWrapper from './HomepageAddressBlockWrapper';

describe('MapWrapper', () => {
  it('should render', () => {
    const store = configureMockStore()({});
    global.reduxStore = store;
    const wrapper = shallow(<HomepageAddressBlockWrapper />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
