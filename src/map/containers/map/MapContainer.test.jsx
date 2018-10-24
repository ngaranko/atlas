import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapContainer from './MapContainer';

import { isMapActive } from '../../../shared/ducks/location/location';
import { previewDataAvailable } from '../../../shared/ducks/selection/selection';
import { isEmbedded } from '../../../shared/ducks/ui/ui';
import { getDrawingMode } from '../../ducks/map/map-selectors';

jest.mock('../../../shared/ducks/location/location');
jest.mock('../../../shared/ducks/selection/selection');
jest.mock('../../../shared/ducks/ui/ui');
jest.mock('../../ducks/map/map-selectors');

describe('MapContainer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {};

    isMapActive.mockImplementation(() => true);
    getDrawingMode.mockImplementation(() => 'none');
    isEmbedded.mockImplementation(() => false);
    previewDataAvailable.mockImplementation(() => false);
  });

  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(
      <MapContainer isFullscreen={false} toggleFullscreen={() => {}} />,
      { context: { store } }
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with drawingmode: draw', () => {
    getDrawingMode.mockImplementation(() => 'draw');
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(
      <MapContainer isFullscreen={false} toggleFullscreen={() => {}} />,
      { context: { store } }
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('should set the leaflet instance state', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(
      <MapContainer isFullscreen={false} toggleFullscreen={() => {}} />,
      { context: { store } }
    ).dive();
    wrapper.instance().setLeafletInstance('leafletInstance');
    expect(wrapper.instance().state.leafletInstance).toBe('leafletInstance');
  });
});
