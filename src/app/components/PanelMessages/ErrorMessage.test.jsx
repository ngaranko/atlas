import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ErrorMessage from './ErrorMessage';
import { getMessage } from '../../../shared/ducks/error/error-message';

jest.mock('../../../shared/ducks/error/error-message');

describe('ErrorMessage', () => {
  it('should render everything', () => {
    const store = configureMockStore()({});
    getMessage.mockImplementation(() => 'Tanjkns');
    const component = shallow(
      <ErrorMessage />, { context: { store } }
    ).dive();
    expect(component).toMatchSnapshot();
  });
});
