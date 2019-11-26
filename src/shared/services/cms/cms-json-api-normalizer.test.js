import normalize from 'json-api-normalize'
import cmsJsonApiNormalizer, { getType } from './cms-json-api-normalizer'

jest.mock('json-api-normalize')

describe('jsonApiNormalizer', () => {
  const mockImageUrl = 'path/to/file'
  let mockData = {
    body: {
      value: 'body',
    },
    title: 'title',
    field_intro: 'intro',
    field_short_title: 'september',
    created: '2019-03-15T00:00:00+01:00',
    field_teaser_image: {
      field_media_image: {
        uri: {
          url: mockImageUrl,
        },
      },
    },
    field_cover_image: {
      field_media_image: {
        uri: {
          url: mockImageUrl,
        },
      },
    },
    type: 'node--article',
  }

  afterEach(() => {
    normalize.mockReset()
  })

  it('should return the correct type', () => {
    const type = 'node--article'

    expect(getType(type)).toBe('article')
  })

  it('should return a normalized json for a single result', () => {
    normalize.mockImplementation(() => ({
      get: () => mockData,
    }))

    const normalizedData = cmsJsonApiNormalizer(mockData, ['field_title', 'field_intro'])

    expect(normalizedData).toEqual({
      ...mockData,
      type: getType(mockData.type),
      intro: mockData.field_intro,
      uuid: mockData.id,
      media_image_url: mockImageUrl,
    })
  })
  it('should return a normalized json for a list', () => {
    mockData = {
      ...mockData,
      field_items: [
        {
          ...mockData,
        },
      ],
    }

    normalize.mockImplementation(() => ({
      get: () => mockData,
    }))

    const normalizedData = cmsJsonApiNormalizer(mockData, ['field_title', 'field_intro'])

    expect(normalizedData).toEqual([
      {
        ...mockData,
        type: getType(mockData.field_items[0].type),
        intro: mockData.field_intro,
        uuid: mockData.id,
        short_title: mockData.field_short_title,
        teaser_url: mockImageUrl,
      },
    ])
  })
})
