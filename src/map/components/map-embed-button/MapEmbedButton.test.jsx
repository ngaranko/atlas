import React from 'react';
import { shallow } from 'enzyme';

import MapEmbedButton from './MapEmbedButton';

describe('MapEmbedButton', () => {
  it('should render the link', () => {
    const link = 'foo/bar';
    const wrapper = shallow(
      <MapEmbedButton
        link={link}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
