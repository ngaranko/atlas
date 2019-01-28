import React from 'react';
import { shallow } from 'enzyme';

import HomepageBlock from './HomepageBlock';

const mockFn = jest.fn();

describe('HomepageBlock', () => {
  it('should render with the default block-link', () => {
    const wrapper = shallow(
      <HomepageBlock
        onBlockLinkClick={mockFn}
        title={'test block'}
        description={'click here for the test link in the block'}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with the children and default block-link', () => {
    const wrapper = shallow(
      <HomepageBlock
        onBlockLinkClick={mockFn}
        title={'test block'}
        description={'click here for the test link in the block'}
      >
        <div>
          <span>This is a child of the homepageblock</span>
        </div>
      </HomepageBlock>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should navigate on enter ', () => {
    const wrapper = shallow(
      <HomepageBlock
        onBlockLinkClick={mockFn}
        title={'test block'}
        description={'click here for the test link in the block'}
      >
        <div>
          <span>This is a child of the homepageblock</span>
        </div>
      </HomepageBlock>
    );

    const mockEvent = { key: 'Enter' };
    wrapper.find('.homepage-block').simulate('keydown', mockEvent);
    expect(mockFn).toHaveBeenCalled();
  });
});
