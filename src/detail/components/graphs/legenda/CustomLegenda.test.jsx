import React from 'react';
import { shallow } from 'enzyme';

import CustomLegenda from './CustomLegenda';

import { CATEGORIES } from '../../../services/grondexploitatie/grafieken/grondexploitatie-categories';

describe('CustomLegenda', () => {
  it('should render everything', () => {
    const data = [
      {
        color: '#c3cf40',
        dataKey: 'Sociale huur.value',
        value: [CATEGORIES.SOCIALE_HUUR]
      },
      {
        color: '#555555',
        dataKey: 'Lumpsum huur.value',
        value: [CATEGORIES.LUPSUM]
      },
      {
        color: '#333333',
        dataKey: 'Markt woningen.value',
        value: [CATEGORIES.MARKT_WONINGEN]
      }
    ];
    const wrapper = shallow(
      <CustomLegenda
        payload={data}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
