import normalize from 'json-api-normalize'
import cmsNormalizer from './cms-normalizer'
import formatDate, { dateToString } from '../date-formatter/date-formatter'
import SHARED_CONFIG from '../shared-config/shared-config'

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
    field_publication_year: '2012',
    field_publication_month: 'september',
    field_publication_day: '23',
    created: '2019-03-15T00:00:00+01:00',
    field_teaser_image: {
      field_media_image: {
        uri: {
          url: 'path/to/file',
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

    const { data: normalizedData } = cmsNormalizer('type', mockResult, [
      'field_slug',
      'field_intro',
    ])

    expect(normalizedData[0].field_slug).toEqual(mockData.field_slug)
    expect(normalizedData[0].field_intro).toEqual(mockData.field_intro)
    expect(normalizedData[0].coverImageUrl).toBe(null)
    expect(normalizedData[0].teaserImageUrl).toBe(`${SHARED_CONFIG.CMS_ROOT}path/to/file`)
    expect(normalizedData[0].fileUrl).toBe(null)
  })

  it('should return a normalized json for publication', () => {
    dateToString.mockReturnValue('15-03-2019')
    formatDate.mockReturnValue('15 Maart 2019')

    const mockResult = {}

    const { data: normalizedData } = cmsNormalizer('publication', mockResult, [
      'field_slug',
      'field_intro',
      'field_publication_year',
      'field_publication_month',
      'field_publication_day',
    ])

    expect(normalizedData[0].localeDate).toBe('23 september 2012')
  })
})
