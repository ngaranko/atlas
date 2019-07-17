import normalize from 'json-api-normalize'
import { normalizeArticleData } from './normalizeFromCMS'

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
        localeDate: 'March 15, 2019',
      })
    })
  })
})
