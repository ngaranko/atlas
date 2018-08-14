import React from 'react';
import { mount, shallow } from 'enzyme';

import HomepageAddressBlock from './HomepageAddressBlock';

const mockFn = jest.fn();

describe('HomepageAddressBlock', () => {
  it('should render with the default block-link', () => {
    const wrapper = shallow(
      <HomepageAddressBlock
        onLinkClick={mockFn}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle button click events', () => {
    const wrapper = mount(
      <HomepageAddressBlock
        onLinkClick={mockFn}
      />
    );

    wrapper.find('button').at(0).simulate('click');
    expect(mockFn).toHaveBeenCalledWith({ dataset: 'bag', filters: {}, page: 1 });

    wrapper.find('button').at(1).simulate('click');
    expect(mockFn).toHaveBeenCalledWith({ dataset: 'hr', filters: {}, page: 1 });

    wrapper.find('button').at(2).simulate('click');
    expect(mockFn).toHaveBeenCalledWith({ dataset: 'brk', filters: {}, page: 1 });

    wrapper.find('button').at(3).simulate('click');
    expect(mockFn).toHaveBeenCalledWith({ dataset: 'brk', filters: {}, page: 1 });
  });
});
