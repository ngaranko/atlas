import React from 'react';
import { shallow } from 'enzyme';

import ShareBar from './ShareBar';

describe('ShareBar', () => {
  const sharePage = jest.fn();
  const showPrintMode = jest.fn();
  const handlePageShare = jest.fn();
  const handlePrintMode = jest.fn();

  const props = {
    hasPrintButton: true,
    sharePage,
    showPrintMode,
    handlePageShare,
    handlePrintMode
  };

  it('should render all the share buttons', () => {
    const component = shallow(
      <ShareBar {...props} />
    );

    expect(component.find('ShareButton').length).toBe(5);
  });

  it('should not render the print button', () => {
    const component = shallow(
      <ShareBar
        {...props}
        hasPrintButton={false}
      />
    );

    expect(component.find('ShareButton').length).toBe(4);
  });

  it('should handle onClick event on share buttons', () => {
    const component = shallow(
      <ShareBar {...props} />
    );

    component.find('ShareButton').at(0).simulate('click');
    expect(handlePageShare).toHaveBeenCalledWith('facebook', sharePage);
  });

  it('should handle onClick event on print button', () => {
    const component = shallow(
      <ShareBar {...props} />
    );

    component.find('ShareButton').at(4).simulate('click');
    expect(handlePrintMode).toHaveBeenCalledWith(showPrintMode);
  });
});
