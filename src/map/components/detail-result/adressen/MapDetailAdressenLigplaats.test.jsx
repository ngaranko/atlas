import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenLigplaats from './MapDetailAdressenLigplaats';

describe('MapDetailAdressenLigplaats', () => {
  it('should render everything', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: { description: 'description', code: '18' },
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `Nee` if indicatie geconstateerd is `false` and show a red bullet', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: { description: 'description', code: '18' },
      indicatieGeconstateerd: false,
      aanduidingInOnderzoek: true
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `Nee` if aanduiding in onderzoek is `false` and show a red bullet', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: { description: 'description', code: '18' },
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: false
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
