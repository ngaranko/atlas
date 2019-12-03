import React from 'react'
import { shallow } from 'enzyme'
import DatasetCard from './DatasetCard'

describe('DatasetCard', () => {
  const mockDatasetItem = {
    shortTitle: 'title',
    teaser: 'the teaser text',
    modified: 'modified',
    lastModified: 'last modified',
    formats: [
      {
        name: 'format1',
        count: 1,
      },
      {
        name: 'format2',
        count: 3,
      },
    ],
  }

  it('should display the title and teaser', () => {
    const component = shallow(<DatasetCard href="link" {...mockDatasetItem} />).dive()

    const heading = component.find('Styled(Heading)')
    expect(heading.exists()).toBeTruthy()
    expect(heading.props().children).toBe(mockDatasetItem.shortTitle)

    const paragraph = component.find('Styled(Paragraph)')
    expect(paragraph.exists()).toBeTruthy()
    expect(paragraph.props().children).toBe(mockDatasetItem.teaser)
  })

  it('should display the date', () => {
    const component = shallow(<DatasetCard href="link" {...mockDatasetItem} />).dive()

    const metaText = component.find("[data-test='metaText']").at(0)

    expect(metaText.exists()).toBeTruthy()
    expect(metaText.props().datetime).toBe(mockDatasetItem.modified)
    expect(metaText.props().children).toBe(`Gewijzigd: ${mockDatasetItem.lastModified}`)
  })

  it('should display the formats', () => {
    const component = shallow(<DatasetCard href="link" {...mockDatasetItem} />).dive()

    const metaText = component.find("[data-test='metaText']").at(1)

    expect(metaText.exists()).toBeTruthy()

    const tags = metaText.find("[data-test='formatTag']")

    expect(tags.at(0).exists()).toBe(true)
    expect(tags.at(1).exists()).toBe(true)

    expect(tags.at(0).props().children[0]).toEqual(
      <strong>{mockDatasetItem.formats[0].name}</strong>,
    )
    expect(tags.at(0).props().children[1]).toMatch(mockDatasetItem.formats[0].count.toString())

    expect(tags.at(1).props().children[0]).toEqual(
      <strong>{mockDatasetItem.formats[1].name}</strong>,
    )
    expect(tags.at(1).props().children[1]).toMatch(mockDatasetItem.formats[1].count.toString())
  })
})
