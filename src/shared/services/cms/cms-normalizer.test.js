import normalize from 'json-api-normalize'
import cmsNormalizer from './cms-normalizer'
import formatDate, { dateToString } from '../date-formatter/date-formatter'

jest.mock('../date-formatter/date-formatter')
jest.mock('json-api-normalize')

describe('normalizeFromCMS', () => {
  const mockData = {
    body: {
      value: 'body',
    },
    title: 'title',
    field_image: 'image',
    field_intro: 'intro',
    field_cover_image: {
      field_media_image: {
        uri: {
          url: 'http://this.is.alink',
        },
      },
    },
    field_teaser_image: {
      field_media_image: {
        uri: {
          url: 'http://this.is.alink',
        },
      },
    },
    created: '2019-03-15T00:00:00+01:00',
  }

  beforeEach(() => {
    normalize.mockImplementation(() => ({
      get: () => [{ data: mockData }],
    }))
  })

  afterEach(() => {
    normalize.mockReset()
  })

  it('should return a normalized json', () => {
    dateToString.mockReturnValue('15-03-2019')
    formatDate.mockReturnValue('15 Maart 2019')

    const mockResult = {
      data: [
        {
          field_cover_image: {
            field_media_image: {
              uri: {
                url: 'http://this.is.alink',
              },
            },
          },
          field_teaser_image: {
            field_media_image: {
              uri: {
                url: 'http://this.is.alink',
              },
            },
          },
        },
      ],
    }

    const normalizedData = cmsNormalizer(mockResult, ['field_image', 'field_intro'])

    expect(normalizedData[0].field_image).toEqual(mockData.field_image)
    expect(normalizedData[0].field_intro).toEqual(mockData.field_intro)
    expect(normalizedData[0].coverImageUrl).toBe('http://this.is.alink')
    expect(normalizedData[0].teaserImageUrl).toBe('http://this.is.alink')
  })
})
