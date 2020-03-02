import React from 'react'
import { shallow } from 'enzyme'
import EditorialCard from './EditorialCard'
import getImageFromCms from '../../utils/getImageFromCms'

jest.mock('../../utils/getImageFromCms')

describe('EditorialCard', () => {
  const mockDataItem = {
    id: 1,
    title: 'long title',
    description: 'intro',
    image: 'thumbnail.jpg',
  }

  getImageFromCms.mockImplementation(() => 'image.jpg')

  it('should display a cover image', () => {
    const component = shallow(<EditorialCard href="link" {...mockDataItem} />).dive()

    const image = component.find('Image')

    expect(image.exists()).toBeTruthy()
    expect(image.props().src).toBe('image.jpg')
  })

  it('should display the correct title', () => {
    const component = shallow(<EditorialCard href="link" {...mockDataItem} />).dive()

    const heading = component.find('Styled(Heading)')

    expect(heading.exists()).toBeTruthy()
    expect(heading.props().children).toBe(mockDataItem.title)
  })

  it("should display a placeholder when there's no cover image", () => {
    const component = shallow(
      <EditorialCard href="link" {...mockDataItem} teaserImage={false} />,
    ).dive()

    const image = component.find('Image')

    expect(image.exists()).toBeTruthy()
    expect(image.props().src).toBe('image.jpg')
  })

  it("should display a type when there's one provided", () => {
    let component = shallow(<EditorialCard href="link" {...mockDataItem} />).dive()

    let contentType = component.find("[data-test='contentType']")

    expect(contentType.exists()).toBeFalsy()

    component = shallow(
      <EditorialCard href="link" specialType="foo2" type="foo" {...mockDataItem} />,
    ).dive()

    contentType = component.find("[data-test='contentType']")

    expect(contentType.exists()).toBeTruthy()
    expect(contentType.props().children).toBe('foo2')

    component = shallow(<EditorialCard href="link" type="foo" {...mockDataItem} />).dive()

    contentType = component.find("[data-test='contentType']")

    expect(contentType.exists()).toBeTruthy()
    expect(contentType.props().children).toBe('foo')
  })

  it("should display a date there's one provided", () => {
    let component = shallow(<EditorialCard href="link" date="date" {...mockDataItem} />).dive()

    let metaText = component.find("[data-test='metaText']")

    expect(metaText.exists()).toBeTruthy()
    expect(metaText.props().children).toBe('date')

    component = shallow(<EditorialCard href="link" specialType="foo" {...mockDataItem} />).dive()

    metaText = component.find("[data-test='metaText']")

    expect(metaText.exists()).toBeFalsy()
  })
})
