import normalize /* fetchByGeoLocation */ from './vastgoed'

import { getByUrl } from '../../../shared/services/api/api'
// import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'

// import mapFetch from '../map-fetch/map-fetch'

jest.mock('../../../shared/services/api/api')
jest.mock('../../../shared/services/shared-config/shared-config')
jest.mock('../map-fetch/map-fetch')

describe('The vastgoed resource', () => {
  // const vastgoedMock = {
  //   _display: 'display',
  //   object_naam: 'object_naam',
  //   bouwjaar: 1000,
  //   status: 'status',
  //   monumentstatus: 'monumentstatus',
  //   vhe_adres: 'Street 123',
  //   bag_verblijfsobject_gebruiksdoelen: 'gebruiksdoel',
  //   huurtype: 'huurtype',
  //   oppervlakte: 123,
  //   bag_pand_geometrie: { type: 'Point' },
  //   features: [{ properties: { id: 1 } }, { properties: { id: 2 } }],
  // }

  afterEach(() => {
    getByUrl.mockReset()
  })

  it('normalized the vastgoed data', () => {
    const input = {
      bag_pand_geometrie: 'geo',
      bouwjaar: 1900,
      monumentstatus: 'foo',
    }

    const output = normalize(input)

    expect(output).toStrictEqual({
      ...input,
      geometry: input.bag_pand_geometrie,
      construction_year: input.bouwjaar,
      monumental_status: input.monumentstatus,
    })
  })

  it('normalized the vastgoed data and handles exceptions', () => {
    const input = {
      bag_pand_geometrie: 'geo',
      bouwjaar: 1005,
      monumentstatus: false,
    }

    const output = normalize(input)

    expect(output).toStrictEqual({
      ...input,
      geometry: input.bag_pand_geometrie,
      construction_year: 'Onbekend',
      monumental_status: 'Geen monument',
    })
  })

  // TODO create spy function
  // it('fetches the vastgoed geosearch', () => {
  //   const mockLocation = { latitude: 123, longitude: 456 }

  //   getByUrl.mockReturnValueOnce(Promise.resolve(vastgoedMock))
  //   mapFetch.mockImplementation(() => vastgoedMock)

  //   normalize.mockImplementation(() => vastgoedMock)

  //   const promise = fetchByGeoLocation(mockLocation)

  //   expect(getByUrl).toHaveBeenCalledWith(
  //     `${SHARED_CONFIG.API_ROOT}geosearch/vastgoed/?lat=${mockLocation.latitude}&lon=${mockLocation.longitude}&item=vastgoed&radius=0`,
  //   )

  //   expect(normalize).toHaveBeenCalled()

  //   return promise
  // })
})
