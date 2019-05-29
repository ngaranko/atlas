import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ConstructionFiles from './ConstructionFiles';
import { sharePage } from '../../../../shared/ducks/ui/ui';

jest.mock('../../../../shared/ducks/ui/ui');

describe('ContextMenu for ConstructionFiles viewer', () => {
  it('should render', () => {
    const props = {
      fileName: 'filename.jpg',
      onDownload: jest.fn()
    };
    const initialState = {
      map: {
        mapPanelActive: true
      },
      ui: {
        viewMode: 'print'
      }
    };
    sharePage.mockImplementation(() => ({ type: 'action' }));

    const store = configureMockStore()({ ...initialState });
    const component = shallow(<ConstructionFiles {...props} />, { context: { store } }).dive();

    expect(component).toMatchSnapshot();
  });
});
