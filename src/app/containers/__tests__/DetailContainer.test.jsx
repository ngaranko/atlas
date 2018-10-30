import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DetailContainer from '../DetailContainer';
import { getDetailEndpoint, isDetailLoading } from '../../../shared/ducks/detail/detail';
import { getUser } from '../../../shared/ducks/user/user';

jest.mock('../../../shared/ducks/detail/detail');
jest.mock('../../../shared/ducks/user/user');

describe('DetailContainer', () => {
  beforeEach(() => {
    isDetailLoading.mockImplementation(() => false);
    getDetailEndpoint.mockImplementation(() => 'myEndpoint');
    getUser.mockImplementation(() => ({}));
  });

  it('should render', () => {
    const store = configureMockStore()({});
    const component = shallow(<DetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
