import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { sharePage, showPrintMode, showEmbedPreview } from '../../../shared/ducks/ui/ui';
import ContextMenu from './ContextMenu';

jest.mock('../../../shared/ducks/ui/ui');

describe('ContextMenu', () => {
  const initialState = {
    map: {
      mapPanelActive: true
    },
    ui: {
      viewMode: 'print'
    }
  };
  const props = {
    isMapPanelVisible: true,
    hasPrintButton: false,
    hasEmbedButton: false
  };

  const store = configureMockStore()({ ...initialState });
  const component = shallow(<ContextMenu {...props} />, { context: { store } }).dive();

  sharePage.mockImplementation(() => ({ type: 'action' }));
  showPrintMode.mockImplementation(() => ({ type: 'action' }));
  showEmbedPreview.mockImplementation(() => ({ type: 'action' }));

  beforeEach(() => {
    global.window.title = 'Page title';
    global.window.open = jest.fn();
  });

  describe('should render all the items of the menu', () => {
    expect(component.find('ContextMenuItem').length).toBe(4);

    it('should only render the print button on certain scenario\'s', () => {
      component.setProps({ hasPrintButton: true });

      component.find('ContextMenuItem').at(0).simulate('click');
      expect(showPrintMode).toHaveBeenCalled();
    });

    it('should only render the embed button on certain scenario\'s', () => {
      component.setProps({ hasPrintButton: false, hasEmbedButton: true });

      component.find('ContextMenuItem').at(0).simulate('click');
      expect(showEmbedPreview).toHaveBeenCalled();
    });
  });

  it('should handle onClick event on pano buttons', () => {
    component.find('ContextMenuItem').at(1).simulate('click');
    expect(sharePage).toHaveBeenCalledWith('facebook');
  });

  it('should handle onClick event on pano buttons', () => {
    component.find('ContextMenuItem').at(2).simulate('click');
    expect(sharePage).toHaveBeenCalledWith('twitter');
  });

  it('should handle onClick event on pano buttons', () => {
    component.find('ContextMenuItem').at(3).simulate('click');
    expect(sharePage).toHaveBeenCalledWith('linkedin');
  });

  it('should handle onClick event on pano buttons', () => {
    component.find('ContextMenuItem').at(4).simulate('click');
    expect(sharePage).toHaveBeenCalledWith('email');
  });
});
