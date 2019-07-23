import fetchByUri from './parkeerzones'
import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'

import { getByUrl } from '../api/api'

jest.mock('../geo-json/geo-json')
jest.mock('../api/api')
jest.mock('../coordinate-reference-system/crs-converter')

describe('The parkeerzone resource', () => {
  afterEach(() => {
    getByUrl.mockReset()
  })

  describe('By uri', () => {
    it('fetches a parkeerzone', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/parkeerzone/123456'
      const parkeerzoneMock = {
        parent: 'parkeerzone',
        gebied_omschrijving: 'String',
        wkb_geometry: { type: 'Point' },
      }
      getByUrl.mockReturnValueOnce(Promise.resolve(parkeerzoneMock))
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }))
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: parkeerzoneMock.parent,
          description: parkeerzoneMock.gebied_omschrijving,
          location: { latitude: 3, longitude: 4 },
          geometrie: parkeerzoneMock.wkb_geometry,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/parkeerzone/123456'

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