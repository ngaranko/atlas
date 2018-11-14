import React from 'react';
import { shallow } from 'enzyme';
import SplitScreen from './SplitScreen';

// Todo: properly test this
describe('SplitScreen', () => {
  it('should render', () => {
    const component = shallow(
      <SplitScreen
        leftComponent={(<p>Hello</p>)}
        rightComponent={(<span>World</span>)}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
