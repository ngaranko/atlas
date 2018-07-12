import React from 'react';
import { shallow } from 'enzyme';

import MapDetailVestiging from './MapDetailVestiging';

describe('MapDetailVestiging', () => {
  it('should render everything', () => {
    const vestiging = {
      activities: [{
        sbiCode: '01',
        sbiDescription: 'SBI Description 1'
      }, {
        sbiCode: '02',
        sbiDescription: 'SBI Description 2'
      }],
      bijzondereRechtstoestand: {
        faillissement: true,
        status: 'Bijzondere rechtstoestand',
        surseanceVanBetaling: false
      },
      kvkNumber: '123456',
      label: 'Vestiging label',
      visitingAddress: { plaats: 'Amsterdam' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailVestiging
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        vestiging={vestiging}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `bijzondere rechtstoestand` when `surseance van betaling`', () => {
    const vestiging = {
      activities: [{
        sbiCode: '01',
        sbiDescription: 'SBI Description 1'
      }, {
        sbiCode: '02',
        sbiDescription: 'SBI Description 2'
      }],
      bijzondereRechtstoestand: {
        faillissement: false,
        status: 'Bijzondere rechtstoestand',
        surseanceVanBetaling: true
      },
      kvkNumber: '123456',
      label: 'Vestiging label',
      visitingAddress: { plaats: 'Amsterdam' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailVestiging
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        vestiging={vestiging}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render `bijzondere rechtstoestand`', () => {
    const vestiging = {
      activities: [{
        sbiCode: '01',
        sbiDescription: 'SBI Description 1'
      }, {
        sbiCode: '02',
        sbiDescription: 'SBI Description 2'
      }],
      bijzondereRechtstoestand: {
        faillissement: false,
        status: 'Bijzondere rechtstoestand',
        surseanceVanBetaling: false
      },
      kvkNumber: '123456',
      label: 'Vestiging label',
      visitingAddress: { plaats: 'Amsterdam' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailVestiging
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        vestiging={vestiging}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without label', () => {
    const vestiging = {
      activities: [{
        sbiCode: '01',
        sbiDescription: 'SBI Description 1'
      }, {
        sbiCode: '02',
        sbiDescription: 'SBI Description 2'
      }],
      bijzondereRechtstoestand: { status: 'Bijzondere rechtstoestand' },
      kvkNumber: '123456',
      visitingAddress: { plaats: 'Amsterdam' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailVestiging
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        vestiging={vestiging}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render everything with hoofdvestiging = false', () => {
    const vestiging = {
      activities: [{
        sbiCode: '01',
        sbiDescription: 'SBI Description 1'
      }, {
        sbiCode: '02',
        sbiDescription: 'SBI Description 2'
      }],
      bijzondereRechtstoestand: { status: 'Bijzondere rechtstoestand' },
      hoofdvestiging: false,
      vestigingsnummer: '0001234',
      kvkNumber: '123456',
      label: 'Vestiging label',
      visitingAddress: { plaats: 'Amsterdam' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailVestiging
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        vestiging={vestiging}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
