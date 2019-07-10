import fetchByUri, { fetchByGeoLocation } from './vastgoed'
import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'
import SHARED_CONFIG from '../shared-config/shared-config'

import { getByUrl } from '../api/api'

jest.mock('../geo-json/geo-json')
jest.mock('../api/api')
jest.mock('../coordinate-reference-system/crs-converter')

describe('The vastgoed resource', () => {
  const vastgoedMock = {
    _display: 'display',
    object_naam: 'object_naam',
    bouwjaar: 1000,
    status: 'status',
    monumentstatus: 'monumentstatus',
    vhe_adres: 'Street 123',
    bag_verblijfsobject_gebruiksdoelen: 'gebruiksdoel',
    huurtype: 'huurtype',
    oppervlakte: 123,
    bag_pand_geometrie: { type: 'Point' },
  }

  afterEach(() => {
    getByUrl.mockReset()
  })

  describe('By uri', () => {
    it('fetches a vastgoed instance', () => {
      const uri = `${SHARED_CONFIG.API_ROOT}vsd/vastgoed/123456`

      getByUrl.mockReturnValueOnce(Promise.resolve(vastgoedMock))
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }))
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: vastgoedMock.object_naam,
          construction_year: vastgoedMock.bouwjaar.toString(),
          status: vastgoedMock.status,
          monumental_status: vastgoedMock.monumentstatus,
          address: vastgoedMock.vhe_adres,
          usage: vastgoedMock.bag_verblijfsobject_gebruiksdoelen,
          usage_type: vastgoedMock.huurtype,
          size: vastgoedMock.oppervlakte,
          location: { latitude: 3, longitude: 4 },
          geometrie: vastgoedMock.bag_pand_geometrie,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches with empty result object', () => {
      const uri = `${SHARED_CONFIG.API_ROOT}vsd/vastgoed/123456`

      getByUrl.mockReturnValueOnce(Promise.resolve({}))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: undefined,
          construction_year: 'Onbekend',
          status: undefined,
          monumental_status: 'Geen monument',
          address: undefined,
          usage: undefined,
          usage_type: undefined,
          size: undefined,
          location: null,
          geometrie: undefined,
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })
  })

  describe('By location', () => {
    it('fetches the vastgoed geosearch', () => {
      const mockLocation = { latitude: 123, longitude: 456 }

      getByUrl.mockReturnValueOnce(Promise.resolve(vastgoedMock))

      const promise = fetchByGeoLocation(mockLocation)

      expect(getByUrl).toHaveBeenCalledWith(
        `${SHARED_CONFIG.API_ROOT}geosearch/vastgoed/?lat=${mockLocation.latitude}&lon=${
          mockLocation.longitude
        }&item=vastgoed&radius=0`,
      )

      return promise
    })
  })
})
