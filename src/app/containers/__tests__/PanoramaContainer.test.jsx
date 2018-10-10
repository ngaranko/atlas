import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import PanoramaContainer from '../PanoramaContainer';

const initialState = {
  straatbeeld: {},
  ui: {
    isPrintMode: false,
    isEmbedPreview: false,
    isEmbed: false
  }
};

describe('PanoramaContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<PanoramaContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
