import React from 'react';
import { shallow } from 'enzyme';

import MapSearchResults from './MapSearchResults';
import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';

jest.mock('../../../shared/services/coordinate-reference-system');

describe('MapSearchResults', () => {
  beforeEach(() => {
    wgs84ToRd.mockImplementation(() => ({ x: 1.12345, y: 654.321 }));
  });

  afterEach(() => {
    wgs84ToRd.mockReset();
  });

  it('should calculate RD coordinates', () => {
    const location = {
      latitude: 15.999,
      longitude: 329.123
    };
    const clickHandler = jest.fn();
    shallow(
      <MapSearchResults
        location={location}
        onItemClick={clickHandler}
        results={[]}
      />
    );
    expect(wgs84ToRd).toHaveBeenCalledWith(location);
  });

  it('should make items clickable', () => {
    const count = 2;
    const location = {
      latitude: 15.999,
      longitude: 329.123
    };
    const clickHandler = jest.fn();
    const panoUrl = 'pano-url';
    const missingLayers = 'Layer 1, Layer 2';
    const results = [
      { label: 'label', categoryLabel: 'category', uri: 'result-uri-1' },
      { label: 'label', categoryLabel: 'category', uri: 'result-uri-2' }
    ];
    const wrapper = shallow(
      <MapSearchResults
        count={count}
        location={location}
        onItemClick={clickHandler}
        panoUrl={panoUrl}
        missingLayers={missingLayers}
        results={results}
      />
    );

    wrapper.find('MapSearchResultsItem').at(0).simulate('click');
    expect(clickHandler).toHaveBeenCalledWith('result-uri-1');
    wrapper.find('MapSearchResultsItem').at(1).simulate('click');
    expect(clickHandler).toHaveBeenCalledWith('result-uri-2');
    expect(clickHandler).toHaveBeenCalledTimes(2);
  });

  describe('rendering', () => {
    it('should render empty results', () => {
      const clickHandler = jest.fn();
      const wrapper = shallow(
        <MapSearchResults
          onItemClick={clickHandler}
          results={[]}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render results', () => {
      const count = 2;
      const location = {
        latitude: 15.999,
        longitude: 329.123
      };
      const clickHandler = jest.fn();
      const panoUrl = 'pano-url';
      const missingLayers = 'Layer 1, Layer 2';
      const results = [
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-1' },
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-2' }
      ];
      const wrapper = shallow(
        <MapSearchResults
          count={count}
          location={location}
          onItemClick={clickHandler}
          panoUrl={panoUrl}
          missingLayers={missingLayers}
          results={results}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should filter external monumenten on pand results', () => {
      const count = 3;
      const location = {
        latitude: 15.999,
        longitude: 329.123
      };
      const clickHandler = jest.fn();
      const results = [
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-1', type: 'bag/pand' },
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-2', type: 'foo' },
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-3', type: 'monumenten/monument' }
      ];
      const wrapper = shallow(
        <MapSearchResults
          count={count}
          location={location}
          onItemClick={clickHandler}
          results={results}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should update results', () => {
      const count = 2;
      const location = {
        latitude: 15.999,
        longitude: 329.123
      };
      const clickHandler = jest.fn();
      const panoUrl = 'pano-url';
      const results = [
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-1' },
        { label: 'label', categoryLabel: 'category', uri: 'result-uri-2' }
      ];
      const wrapper = shallow(
        <MapSearchResults
          count={count}
          location={location}
          onItemClick={clickHandler}
          panoUrl={panoUrl}
          results={results}
        />
      );
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({
        count: 3,
        location: {
          latitude: 1,
          longitude: 0
        },
        panoUrl: 'other-pano-url',
        missingLayers: 'Layer 3',
        results: [
          { label: 'label', categoryLabel: 'category', uri: 'result-uri-1' },
          { label: 'label', categoryLabel: 'category', uri: 'result-uri-2' },
          { label: 'label', categoryLabel: 'category', uri: 'result-uri-3' }
        ]
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
