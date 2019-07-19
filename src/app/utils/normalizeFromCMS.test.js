import normalize from 'json-api-normalize'
import normalizeFromCMS from './normalizeFromCMS'
import formatDate, { dateToString } from '../../shared/services/date-formatter/date-formatter'

jest.mock('../../shared/services/date-formatter/date-formatter')
jest.mock('json-api-normalize')

normalize.mockImplementation(() => ({
  get: () => [
    {
      body: {
        value: 'body',
      },
      title: 'title',
      field_image: 'image',
      field_intro: 'intro',
      created: '2019-03-15T00:00:00+01:00',
    },
  ],
}))

describe('normalizeFromCMS', () => {
  it('should return a normalized json', () => {
    dateToString.mockReturnValue('15-03-2019')
    formatDate.mockReturnValue('15 Maart 2019')

    const mockResult = {
      included: [
        {},
        {
          attributes: {
            uri: {
              url: 'http://this.is.alink'
            }
          }
        }
      ]
    }

    const normalizedData = normalizeFromCMS(mockResult, [
      'field_image',
      'field_intro'
    ])

    expect(normalizedData.field_image).toBeTruthy()
    expect(normalizedData.field_intro).toBeTruthy()
    expect(normalizedData.coverUrl).toBe('http://this.is.alink')
  })
})
