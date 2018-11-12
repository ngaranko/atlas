import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DetailContainer from '../DetailContainer';
import { getDetailEndpoint, isDetailLoading } from '../../../shared/ducks/detail/detail';
import { getUser } from '../../../shared/ducks/user/user';
import { getPanoPreview, isPanoPreviewLoading } from '../../../pano/ducks/preview/pano-preview';

jest.mock('../../../shared/ducks/detail/detail');
jest.mock('../../../shared/ducks/user/user');
jest.mock('../../../pano/ducks/preview/pano-preview');

describe('DetailContainer', () => {
  beforeEach(() => {
    isDetailLoading.mockReturnValue(false);
    getDetailEndpoint.mockReturnValue('myEndpoint');
    getUser.mockReturnValue({});
    getPanoPreview.mockReturnValue({});
    isPanoPreviewLoading.mockReturnValue(false);
  });

  it('should render', () => {
    const store = configureMockStore()({});
    const component = shallow(<DetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
