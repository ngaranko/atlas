import React from 'react';
import { shallow } from 'enzyme';

import ContextMenuComponent from './ContextMenuComponent';

describe('ContextMenuComponent', () => {
  const sharePage = jest.fn();
  const handlePageShare = jest.fn();
  const handlePrintMode = jest.fn();
  const showPrintMode = jest.fn();

  const props = {
    isMapPanelVisible: true,
    sharePage,
    handlePageShare,
    handlePrintMode,
    showPrintMode
  };

  it('should render all the items of the menu', () => {
    const component = shallow(
      <ContextMenuComponent {...props} />
    );
    expect(component.find('ContextMenuItem').length).toBe(5);
  });


  it('should handle onClick event on share buttons', () => {
    const component = shallow(
      <ContextMenuComponent {...props} />
    );
    component.find('ContextMenuItem').at(1).simulate('click');
    expect(handlePageShare).toHaveBeenCalledWith('facebook', sharePage);
  });

  it('should handle onClick event on print button', () => {
    const component = shallow(
      <ContextMenuComponent {...props} />
    );
    component.find('ContextMenuItem').at(0).simulate('click');
    expect(handlePrintMode).toHaveBeenCalledWith(showPrintMode);
  });
});
