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
    field_slug: 'image',
    field_intro: 'intro',
    created: '2019-03-15T00:00:00+01:00',
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
  }

  beforeEach(() => {
    normalize.mockImplementation(() => ({
      get: () => [{ ...mockData }],
    }))
  })

  afterEach(() => {
    normalize.mockReset()
  })

  it('should return a normalized json', () => {
    dateToString.mockReturnValue('15-03-2019')
    formatDate.mockReturnValue('15 Maart 2019')

    const mockResult = {}

    const normalizedData = cmsNormalizer(mockResult, ['field_slug', 'field_intro'])

    expect(normalizedData[0].field_slug).toEqual(mockData.field_slug)
    expect(normalizedData[0].field_intro).toEqual(mockData.field_intro)
    expect(normalizedData[0].coverImageUrl).toBe('http://this.is.alink')
    expect(normalizedData[0].teaserImageUrl).toBe('http://this.is.alink')
    expect(normalizedData[0].fileUrl).toBe(undefined)
  })
})
