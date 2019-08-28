import fetchByUri from './map-fetch'
import { getByUrl } from '../../../shared/services/api/api'

jest.mock('../../../shared/services/api/api')
jest.mock('../../../shared/services/geo-json/geo-json')
jest.mock('../../../shared/services/coordinate-reference-system/crs-converter')

describe('map-fetch', () => {
  it('should return the API results including geometry and location', async () => {
    const uri = 'https://api.call'

    const mockResult = {
      geometrie: 'geometrie',
      location: [0, 1],
      _display: 'label',
    }

    getByUrl.mockImplementation(() => mockResult)

    const result = await fetchByUri(uri)

    expect(getByUrl).toHaveBeenCalledWith(uri)

    expect(result).toMatchObject({ geometrie: 'geometrie', label: 'label', location: [0, 1] })
  })

  it('should normalize the API results', async () => {
    const uri = 'https://api.call'

    const mockNormalization = jest.fn(() => ({
      field: 'foo',
      geometry: 'normalized',
    }))

    const mockResult = {
      location: [0, 1],
      _display: 'label',
    }

    getByUrl.mockImplementation(() => mockResult)

    const result = await fetchByUri(uri, mockNormalization)

    expect(mockNormalization).toHaveBeenCalledWith(mockResult)

    expect(result).toMatchObject({ field: 'foo', geometrie: 'normalized' })
  })
})

// export default async function fetchByUri(uri, normalization = false) {
//   const result = await getByUrl(uri)

//   // as some APIs return data in a different format than the frontend wants to display
//   // some API results are normalized or even enhanced with results from additional API calls
//   let normalizedData = false
//   if (normalization) {
//     normalizedData = await normalization(result)
//   }

//   // "geometrie" is often returned from the instance API, "gemoetry" is created by the normalizers
//   const geometry = result.geometrie || result.geometry || normalizedData.geometry

//   const geometryCenter = geometry && getCenter(geometry)
//   const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

//   return {
//     label: result._display,
//     ...(normalizedData || result),
//     // "label" may be overwritten by the result or normalizedData, but the location and geometry are constructed above
//     location: result.location || wgs84Center,
//     geometrie: geometry,
//   }
// }
