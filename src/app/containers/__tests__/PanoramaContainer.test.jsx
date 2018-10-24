import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import PanoramaContainer from '../PanoramaContainer';
import { getHotspots, getStraatbeeld } from '../../../shared/ducks/straatbeeld/straatbeeld';

jest.mock('../../../shared/ducks/straatbeeld/straatbeeld');

describe('PanoramaContainer', () => {
  it('should render', () => {
    const store = configureMockStore()();
    getStraatbeeld.mockImplementation(() => ({}));
    getHotspots.mockImplementation(() => []);
    const component = shallow(
      <PanoramaContainer isFullscreen={false} />,
      { context: { store } }
    ).dive();
    expect(component).toMatchSnapshot();
  });
});
