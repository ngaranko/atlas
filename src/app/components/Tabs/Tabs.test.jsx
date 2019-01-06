import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './Tabs';

describe('Tabs', () => {
  it('should render the component', () => {
    const props = {
      currentTab: 'Dataset'
    };

    const component = shallow(<Tabs {...props} >
      <li key="Dataset">
        <span>This is a tab child</span>
      </li>
      <li key="Data" label="test-label">
        <span>This is a tab child</span>
      </li>
    </Tabs>);
    expect(component).toMatchSnapshot();
  });

  it('should handle component when there are invalid children', () => {
    const props = {
      currentTab: 'Dataset'
    };

    const component = shallow(<Tabs {...props} >
      [
        {React.createElement(jest.fn)},  // invalid child
        <li key="Data" label="test-label">
          <span>This is a tab child</span>
        </li>
      ]
    </Tabs>);
    expect(component).toMatchSnapshot();
  });
});
