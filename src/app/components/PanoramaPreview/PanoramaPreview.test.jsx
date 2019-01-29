import React from 'react';
import { shallow } from 'enzyme';
import PanoramaPreview from './PanoramaPreview';

describe('PanoramaPreview', () => {
  it('should render the component', () => {
    const props = {
      isLoading: false
    };

    const component = shallow(
      <PanoramaPreview {...props} />
    );
    expect(component).toMatchSnapshot();
  });
});
