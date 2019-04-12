import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ContextMenu from './ContextMenu';

const initialState = {
  map: {
    mapPanelActive: true
  },
  ui: {
    viewMode: 'print'
  }
};

describe('ContextMenu', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<ContextMenu />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});
