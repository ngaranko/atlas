import React from 'react';
import { shallow } from 'enzyme';

import CustomLegenda from './CustomLegenda';

describe('CustomLegenda', () => {
  it('should render everything', () => {
    const data = [
      {
        color: '#c3cf40',
        dataKey: 'Sociale huur.value',
        value: 'Value 1'
      },
      {
        color: '#555555',
        dataKey: 'Sociale huur.value',
        value: 'Value 2'
      },
      {
        color: '#333333',
        dataKey: 'Sociale huur.value',
        value: 'Value 3'
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
