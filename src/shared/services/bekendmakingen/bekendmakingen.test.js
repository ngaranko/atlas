import fetchByUri from './bekendmakingen'
import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'
import { dateToString } from '../date-formatter/date-formatter'

import { getByUrl } from '../api/api'

jest.mock('../geo-json/geo-json')
jest.mock('../api/api')
jest.mock('../coordinate-reference-system/crs-converter')
jest.mock('../date-formatter/date-formatter')

describe('The bekendmakingen resource', () => {
  afterEach(() => {
    getByUrl.mockReset()
    rdToWgs84.mockReset()
  })

  describe('By uri', () => {
    it('fetches a bekendmaking', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/bekendmakingen/123456'
      const bekendmakingMock = {
        _display: 'bekendmaking titel',
        wkb_geometry: { type: 'Point' },
        id: '123456',
        datum: '2012-12-12T12:12:12Z',
        beschrijving: 'Lorem ipsum...',
        categorie: 'test categorie',
        onderwerp: 'test onderwerp',
        url: 'http://bekendmaking/title',
      }
      getByUrl.mockReturnValueOnce(Promise.resolve(bekendmakingMock))
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }))
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }))
      dateToString.mockImplementation(() => '2012-12-12')

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          beschrijving: bekendmakingMock.beschrijving,
          label: bekendmakingMock._display,
          location: { latitude: 3, longitude: 4 },
          onderwerp: bekendmakingMock.onderwerp,
          categorie: bekendmakingMock.categorie,
          geometrie: bekendmakingMock.wkb_geometry,
          date: '2012-12-12',
          url: bekendmakingMock.url,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/bekendmakingen/123456'

      getByUrl.mockReturnValueOnce(Promise.resolve({}))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          beschrijving: undefined,
          label: undefined,
          location: null,
          onderwerp: undefined,
          categorie: undefined,
          geometrie: undefined,
          date: '',
          url: undefined,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })
  })
})
