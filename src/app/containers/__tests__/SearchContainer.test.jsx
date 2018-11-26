import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SearchContainer from '../SearchContainer';

import {
  getDataSearchLocation,
  getNumberOfResults
} from '../../../shared/ducks/data-search/data-search';
import { getPanoramaPreview, isPanoramaPreviewLoading } from '../../../shared/ducks/panorama/preview/panorama-preview';
import { getShortSelectedLocation } from '../../../map/ducks/map/map-selectors';
import { getUser } from '../../../shared/ducks/user/user';

jest.mock('../../../shared/ducks/user/user');
jest.mock('../../../map/ducks/map/map-selectors');
jest.mock('../../../shared/ducks/panorama/preview/panorama-preview');
jest.mock('../../../shared/ducks/data-search/data-search');

describe('SearchContainer', () => {
  it('should render', () => {
    getUser.mockReturnValue({});
    getDataSearchLocation.mockReturnValue({
      latitude: 321,
      longitude: 123
    });
    getNumberOfResults.mockReturnValue(12);
    getShortSelectedLocation.mockReturnValue({
      latitude: 321,
      longitude: 123
    });
    getPanoramaPreview.mockReturnValue({
      url: 'testUrl',
      id: 42,
      heading: 99
    });
    isPanoramaPreviewLoading.mockReturnValue(false);
    const store = configureMockStore()();
    const component = shallow(<SearchContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
