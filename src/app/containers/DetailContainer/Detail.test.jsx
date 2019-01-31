import React from 'react';
import { shallow } from 'enzyme';
import Detail from './Detail';

describe('Detail', () => {
  it('should render', () => {
    const component = shallow(
      <Detail
        user={{}}
        endpoint="http://example.com"
        isLoading={false}
        isPreviewPanoramaLoading={false}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
