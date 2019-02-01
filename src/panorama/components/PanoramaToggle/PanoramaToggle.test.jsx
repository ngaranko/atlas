import React from 'react';
import { shallow } from 'enzyme';

import { fetchPanoramaRequestToggle } from '../../ducks/actions';

import PanoramaToggle from './PanoramaToggle';

jest.mock('../../ducks/actions');

describe('PanoramaToggle', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <PanoramaToggle
        {...{
          heading: 999,
          history: {
            year: 2020,
            label: 'ABC',
            missionType: 'ABC'
          },
          historyOptions: [
            {
              year: 2020,
              label: 'ABC',
              layerName: '2020ABC',
              missionType: 'ABC'
            },
            {
              year: 2020,
              label: 'XYZ',
              layerName: '2020XYZ',
              missionType: 'XYZ'
            }
          ],
          location: [2, 3],
          fetchPanoramaRequest: jest.fn
        }}
      />
    );
  });

  fetchPanoramaRequestToggle.mockReturnValue({ type: '' });

  it('should render everything', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('menu opens on button click', () => {
    expect(wrapper.instance().state.showMenu).toBe(false);

    wrapper.find('.c-panorama-toggle__button').simulate('click');

    expect(wrapper.instance().state.showMenu).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('fires panoramaRequest on button click in menu', () => {
    wrapper.instance().setState({ showMenu: true });
    wrapper.update();

    wrapper.find('.c-panorama-toggle__item').at(1).simulate('click');
    expect(wrapper.instance().state.showMenu).toBe(false);
  });
});
