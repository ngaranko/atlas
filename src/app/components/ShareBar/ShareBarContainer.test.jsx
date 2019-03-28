import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ShareBarContainer from './ShareBarContainer';

const initialState = {
  ui: {
    viewMode: 'print'
  }
};

describe('ShareBarContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<ShareBarContainer />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});
