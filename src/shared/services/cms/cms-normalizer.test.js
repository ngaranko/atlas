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
    created: '2019-03-15T00:00:00+01:00',
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

    const mockResult = {
      included: [
        {},
        {
          attributes: {
            uri: {
              url: 'http://this.is.alink',
            },
          },
        },
      ],
    }

    const normalizedData = cmsNormalizer(mockResult, [
      'field_image',
      'field_intro',
    ])

    expect(normalizedData.field_image).toEqual(mockData.field_image)
    expect(normalizedData.field_intro).toEqual(mockData.field_intro)
    expect(normalizedData.coverUrl).toBe('http://this.is.alink')
  })
})
