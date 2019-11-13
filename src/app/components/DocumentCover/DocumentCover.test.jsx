import React from 'react'
import { shallow } from 'enzyme'
import { Download } from '@datapunt/asc-assets'
import { Spinner } from '@datapunt/asc-ui'
import DocumentCover from './DocumentCover'

describe('DocumentCover', () => {
  const mockOnClick = jest.fn()

  const props = {
    imageSrc: '/images/this-image.jpg',
    onClick: mockOnClick,
    title: 'Title',
    description: 'Lorem ipsum...',
    loading: false,
  }

  it('should display a cover image', () => {
    const component = shallow(<DocumentCover {...props} />).dive()
    const image = component.find('Styled(Image)')

    expect(image.exists()).toBeTruthy()
    expect(image.props().src).toBe(props.imageSrc)
  })

  it('should be possible to click the button', () => {
    const component = shallow(<DocumentCover {...props} />).dive()
    const button = component.find('Styled(Button)')

    expect(button.exists()).toBeTruthy()
    expect(button.props().children).toBe(props.description)

    button.simulate('click')

    expect(mockOnClick).toHaveBeenCalledWith()
  })

  it('should show a loading indicator when the result of the button is loading', () => {
    let component = shallow(<DocumentCover {...props} />).dive()
    let button = component.find('Styled(Button)')

    expect(button.props().iconLeft).toStrictEqual(<Download />)

    component = shallow(<DocumentCover {...{ ...props, loading: true }} />).dive()
    button = component.find('Styled(Button)')

    expect(button.props().iconLeft).toStrictEqual(<Spinner />)
  })
})
