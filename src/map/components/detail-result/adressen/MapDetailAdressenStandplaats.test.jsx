import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenStandplaats from './MapDetailAdressenStandplaats';

describe('MapDetailAdressenStandplaats', () => {
  it('should render everything', () => {
    const standplaats = {
      label: 'Standplaats label',
      status: { description: 'description' },
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenStandplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        standplaats={standplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `Nee` if indicatie geconstateerd is `false` and show a red bullet', () => {
    const standplaats = {
      label: 'Standplaats label',
      status: { description: 'description' },
      indicatieGeconstateerd: false,
      aanduidingInOnderzoek: true
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenStandplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        standplaats={standplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `Nee` if aanduiding in onderzoek is `false` and show a red bullet', () => {
    const standplaats = {
      label: 'Standplaats label',
      status: { description: 'description' },
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: false
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenStandplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        standplaats={standplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
