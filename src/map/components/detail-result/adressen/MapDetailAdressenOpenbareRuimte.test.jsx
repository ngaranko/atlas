import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenOpenbareRuimte from './MapDetailAdressenOpenbareRuimte';

describe('MapDetailAdressenOpenbareRuimte', () => {
  it('should render everything', () => {
    const openbareRuimte = {
      label: 'Openbare ruimte label',
      status: {
        code: '',
        description: 'Openbare ruimte status'
      },
      type: 'Openbare ruimte type'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenOpenbareRuimte
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        openbareRuimte={openbareRuimte}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
