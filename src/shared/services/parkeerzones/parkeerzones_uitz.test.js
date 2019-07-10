import fetchByUri from './parkeerzones_uitz'
import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'

import { getByUrl } from '../api/api'

jest.mock('../geo-json/geo-json')
jest.mock('../api/api')
jest.mock('../coordinate-reference-system/crs-converter')

describe('The parkeerzone uitz resource', () => {
  afterEach(() => {
    getByUrl.mockReset()
  })

  describe('By uri', () => {
    it('fetches a parkeerzone uitz', () => {
      const uri =
        'https://acc.api.data.amsterdam.nl/vsd/parkeerzone_uitz/123456'
      const parkeerzoneUitzMock = {
        gebied_naam: 'parkeerzone uitz',
        omschrijving: 'String',
        wkb_geometry: { type: 'Point' },
      }
      getByUrl.mockReturnValueOnce(Promise.resolve(parkeerzoneUitzMock))
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }))
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: parkeerzoneUitzMock.gebied_naam,
          description: parkeerzoneUitzMock.omschrijving,
          location: { latitude: 3, longitude: 4 },
          geometrie: parkeerzoneUitzMock.wkb_geometry,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches with empty result object', () => {
      const uri =
        'https://acc.api.data.amsterdam.nl/vsd/parkeerzone_uitz/123456'

      getByUrl.mockReturnValueOnce(Promise.resolve({}))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: undefined,
          description: undefined,
          location: null,
          geometrie: undefined,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })
  })
})
