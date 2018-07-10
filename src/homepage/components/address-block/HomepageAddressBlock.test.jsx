import React from 'react';
import { shallow } from 'enzyme';

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
});
