import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import HomepageAddressBlockContainer from './HomepageAddressBlockContainer';

describe('HomepageAddressBlockContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({});
    const wrapper = shallow(<HomepageAddressBlockContainer />, { context: { store } }).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
