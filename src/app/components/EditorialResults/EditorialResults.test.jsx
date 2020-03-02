import React from 'react'
import { shallow } from 'enzyme'
import EditorialResults, { IMAGE_SIZE } from './EditorialResults'
import { TYPES } from '../../../shared/config/cms.config'

describe('EditorialResults', () => {
  let component

  const props = {
    id: '1',
    specialType: false,
    slug: 'slug',
    coverImage: '123.jpg',
    teaserImage: '456.jpg',
    dateLocale: 'locale',
    label: 'label',
    teaser: 'long text',
  }

  it('should display the loading indicator', () => {
    component = shallow(<EditorialResults type={TYPES.ARTICLE} loading results={[]} errors={[]} />)
    expect(component.find('LoadingIndicator').exists()).toBe(true)

    component = shallow(
      <EditorialResults type={TYPES.ARTICLE} loading={false} results={[]} errors={[]} />,
    )
    expect(component.find('LoadingIndicator').exists()).toBe(false)
  })

  it('should render the cards', () => {
    component = shallow(<EditorialResults type={TYPES.ARTICLE} results={[]} errors={[]} />)
    expect(component.find('EditorialCard').exists()).toBe(false)

    // Should render two cards
    component = shallow(<EditorialResults type={TYPES.ARTICLE} results={[{}, {}]} errors={[]} />)
    expect(component.find('EditorialCard').exists()).toBe(true)
    expect(component.find('EditorialCard')).toHaveLength(2)
  })

  it('should set the correct props', () => {
    component = shallow(<EditorialResults type={TYPES.ARTICLE} results={[props]} errors={[]} />)

    const editorialCard = component.find('EditorialCard')

    expect(editorialCard.exists()).toEqual(true)
    expect(editorialCard.props()).toMatchObject({
      date: props.dateLocale,
      description: props.teaser,
      image: props.teaserImage,
      imageDimensions: [IMAGE_SIZE, IMAGE_SIZE],
      specialType: props.specialType,
      title: props.label,
      to: {
        payload: {
          id: props.id,
          slug: props.slug,
        },
      },
    })
  })

  it('should set the correct props for publications', () => {
    component = shallow(<EditorialResults type={TYPES.PUBLICATION} results={[props]} errors={[]} />)

    const editorialCard = component.find('EditorialCard')

    expect(editorialCard.exists()).toEqual(true)
    expect(editorialCard.props()).toMatchObject({
      image: props.coverImage, // Publications use a different image source
      imageDimensions: [IMAGE_SIZE * 0.7, IMAGE_SIZE], // Publications have vertically aligned images
    })
  })

  it('should set the correct props for specials', () => {
    component = shallow(
      <EditorialResults
        type={TYPES.SPECIAL}
        results={[{ ...props, specialType: 'foo' }]}
        errors={[]}
      />,
    )

    const editorialCard = component.find('EditorialCard')

    expect(editorialCard.exists()).toEqual(true)
    expect(editorialCard.props()).toMatchObject({
      to: {
        payload: {
          id: props.id,
          type: 'foo', // The special type is important for constructing the route
          slug: props.slug,
        },
      },
      date: false, // Specials have no display date
    })
  })
})
