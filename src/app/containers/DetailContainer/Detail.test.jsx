import React from 'react';
import { shallow } from 'enzyme';
import Detail from './Detail';

describe('Detail', () => {
  it('should render', () => {
    const props = {
      isLoading: false,
      user: {},
      endpoint: 'http://example.com',
      previewPanorama: null,
      isPreviewPanoramaLoading: false,
      detailTemplateUrl: '',
      detailData: {},
      detailFilterSelection: {},
      onFetchDetailRequest: jest.fn(),
      id: '1',
      subType: 'nummeraanduiding'
    };
    const component = shallow(<Detail {...props} />);
    expect(component).toMatchSnapshot();
  });
});
