import React from 'react'
import { shallow } from 'enzyme'
import EditorialCard from './EditorialCard'
import getImageFromCms from '../../utils/getImageFromCms'
import { TYPES } from '../../../shared/config/cms.config'

jest.mock('../../utils/getImageFromCms')

describe('EditorialCard', () => {
  const mockDataItem = {
    id: 1,
    title: 'title',
    intro: 'intro',
    teaserImage: 'thumbnail.jpg',
    type: TYPES.PUBLICATION,
  }

  getImageFromCms.mockImplementation(() => 'image.jpg')

  it('should display a cover image', () => {
    const component = shallow(<EditorialCard href="link" {...mockDataItem} />).dive()

    const image = component.find('Image')

    expect(image.exists()).toBeTruthy()
    expect(image.props().src).toBe('image.jpg')
  })

  it("should display a placeholder when there's no cover image", () => {
    const component = shallow(
      <EditorialCard href="link" {...mockDataItem} teaserImage={false} />,
    ).dive()

    const image = component.find('Image')

    expect(image.exists()).toBeTruthy()
    expect(image.props().src).toBe('image.jpg')
  })

  it("should display a tag when there's one provided", () => {
    const component = shallow(
      <EditorialCard href="link" specialType="foo" {...mockDataItem} />,
    ).dive()

    const tag = component.find('Styled(Tag)')

    expect(tag.exists()).toBeTruthy()
    expect(tag.props().children).toBe('foo')
  })

  it("should display a localeDate there's one provided unless it has a specialType", () => {
    let component = shallow(
      <EditorialCard
        href="link"
        localeDate="locale"
        localeDateFormatted="formatted"
        {...mockDataItem}
      />,
    ).dive()

    let metaText = component.find("[data-test='metaText']")

    expect(metaText.exists()).toBeTruthy()
    expect(metaText.props().children).toBe('formatted')

    component = shallow(
      <EditorialCard
        href="link"
        localeDate="locale"
        localeDateFormatted="formatted"
        specialType="foo"
        {...mockDataItem}
      />,
    ).dive()

    metaText = component.find("[data-test='metaText']")

    expect(metaText.exists()).toBeFalsy()
  })
})
