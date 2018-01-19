import React from 'react';
import { shallow } from 'enzyme';

import MapSearchResultsItem from './MapSearchResultsItem';

describe('MapSearchResultsItem', () => {
  it('should make an item clickable', () => {
    const clickHandler = jest.fn();
    const categoryLabel = 'Adres';
    const label = 'Dam 1';
    const wrapper = shallow(
      <MapSearchResultsItem
        onClick={clickHandler}
        categoryLabel={categoryLabel}
        label={label}
      />
    );

    wrapper.find('button').at(0).simulate('click');
    expect(clickHandler).toHaveBeenCalled();
  });

  describe('rendering', () => {
    it('should render an item', () => {
      const clickHandler = jest.fn();
      const categoryLabel = 'Adres';
      const label = 'Dam 1';
      const wrapper = shallow(
        <MapSearchResultsItem
          onClick={clickHandler}
          categoryLabel={categoryLabel}
          label={label}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should update an item', () => {
      const clickHandler = jest.fn();
      const categoryLabel = 'Adres';
      const label = 'Dam 1';
      const wrapper = shallow(
        <MapSearchResultsItem
          onClick={clickHandler}
          categoryLabel={categoryLabel}
          label={label}
        />
      );

      wrapper.setProps({
        categoryLabel: 'Bouwblok',
        label: 'ABC123'
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
