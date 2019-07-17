import normalize from 'json-api-normalize'
import { normalizeArticleData } from './normalizeFromCMS'
import { dateToString } from '../../shared/services/date-formatter/date-formatter'

jest.mock('../../shared/services/date-formatter/date-formatter')
jest.mock('json-api-normalize')

normalize.mockImplementation(() => ({
  get: () => [
    {
      body: {
        value: 'body',
      },
      title: 'title',
      field_byline: 'byline',
      field_downloads: 'downloads',
      field_image: 'image',
      field_intro: 'intro',
      field_slug: 'slug',
      field_links: 'links',
      field_publication_date: '2019-03-15T00:00:00+01:00',
    },
  ],
}))

describe('normalizeFromCMS', () => {
  describe('normalizeArticleData', () => {
    it('should return a normalized json', () => {
      jest.spyOn(global, 'Date').mockImplementation(() => ({
        toLocaleDateString: jest.fn().mockReturnValue('15 Maart 2019'),
      }))
      dateToString.mockReturnValue('15-03-2019')
      expect(normalizeArticleData([])).toEqual({
        title: 'title',
        byline: 'byline',
        downloads: 'downloads',
        image: 'image',
        intro: 'intro',
        slug: 'slug',
        body: 'body',
        date: '15-03-2019',
        links: 'links',
        localeDate: '15 Maart 2019',
      })
    })
  })
})
