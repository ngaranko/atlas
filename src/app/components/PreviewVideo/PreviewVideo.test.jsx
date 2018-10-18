import React from 'react';
import { shallow } from 'enzyme';
import PreviewVideo from './PreviewVideo';

describe('PreviewVideo', () => {
  let component;
  let instance;
  let state;

  beforeEach(() => {
    component = shallow(
      <PreviewVideo
        src="/video.mp4"
        type="video/mp4"
        poster="/poster.jpg"
      />
    );
    instance = component.instance();
    state = instance.state;
  });

  it('should render', () => {
    expect(component).toMatchSnapshot();
  });

  it('should toggle the play state on mouseover and mouseout', () => {
    instance.togglePlay = jest.fn();
    component.find('div').simulate('mouseover');
    expect(instance.togglePlay).toHaveBeenCalledWith(true);
    component.find('div').simulate('mouseout');
    expect(instance.togglePlay).toHaveBeenCalledWith(false);
  });

  it('should toggle the play state on focus and blur', () => {
    instance.togglePlay = jest.fn();
    component.find('div').simulate('focus');
    expect(instance.togglePlay).toHaveBeenCalledWith(true);
    component.find('div').simulate('blur');
    expect(instance.togglePlay).toHaveBeenCalledWith(false);
  });

  describe('togglePlay method', () => {
    beforeEach(() => {
      instance.setState = jest.fn();
    });

    it('should set the playing state to true', () => {
      instance.togglePlay(true);
      expect(instance.setState).toHaveBeenCalledWith({
        play: true,
        position: 0
      });
    });

    it('should set the playing state to false', () => {
      instance.state.position = 12;
      instance.togglePlay(false);
      expect(instance.setState).toHaveBeenCalledWith({
        play: false,
        position: 0
      });
    });
  });
});
