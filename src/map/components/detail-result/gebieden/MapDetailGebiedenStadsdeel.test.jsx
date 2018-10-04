import React from 'react';
import { shallow } from 'enzyme';

import MapDetailGebiedenStadsdeel from './MapDetailGebiedenStadsdeel';

describe('MapDetailGebiedenStadsdeel', () => {
  it('should render everything', () => {
    const stadsdeel = {
      label: 'Stadsdeel label',
      code: 'A'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailGebiedenStadsdeel
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        stadsdeel={stadsdeel}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render grex', () => {
    const stadsdeel = {
      label: 'Stadsdeel label',
      code: 'A',
      grex: {
        totalIncomeLabel: 'foo',
        totalExpenseLabel: 'bar',
        totalResultLabel: 'abc'
      }
    };
    const wrapper = shallow(
      <MapDetailGebiedenStadsdeel
        panoUrl="panoUrl"
        onMaximize={() => {}}
        onPanoPreviewClick={() => {}}
        stadsdeel={stadsdeel}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
