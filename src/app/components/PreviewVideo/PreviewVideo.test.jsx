import React from 'react'
import { shallow } from 'enzyme'
import PreviewVideo from './PreviewVideo'

describe('PreviewVideo', () => {
  let component
  let instance

  beforeEach(() => {
    jest.spyOn(PreviewVideo.prototype, 'togglePlay')

    component = shallow(<PreviewVideo src="/video.mp4" type="video/mp4" poster="/poster.jpg" />)
    instance = component.instance()
  })

  it('should render', () => {
    expect(component).toMatchSnapshot()
  })

  it('should call togglePlay when hover, focus, mouseover and mouseout', () => {
    component.find('div').simulate('mouseover')
    component.find('div').simulate('mouseout')
    component.find('div').simulate('focus')
    component.find('div').simulate('blur')
    expect(PreviewVideo.prototype.togglePlay).toHaveBeenCalledTimes(4)
  })

  describe('togglePlay method', () => {
    beforeEach(() => {
      instance.setState = jest.fn()
    })

    it('should set the playing state to true', () => {
      instance.togglePlay()
      expect(instance.setState).toHaveBeenCalledWith({
        play: true,
        position: 0,
      })
    })

    it('should set the playing state to false', () => {
      instance.state.play = true
      instance.state.position = 12
      instance.togglePlay()
      expect(instance.setState).toHaveBeenCalledWith({
        play: false,
        position: 0,
      })
    })
  })
})
