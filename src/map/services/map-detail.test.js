import detail from './map-detail'
import adressenLigplaats from '../../shared/services/adressen/adressen-ligplaats'
import adressenNummeraanduiding from '../../shared/services/adressen/adressen-nummeraanduiding'
import napPeilmerk from '../../shared/services/nap-peilmerk/nap-peilmerk'
import vestiging from '../../shared/services/vestiging/vestiging'

jest.mock('../../shared/services/adressen/adressen-ligplaats')
jest.mock('../../shared/services/adressen/adressen-nummeraanduiding')
jest.mock('../../shared/services/nap-peilmerk/nap-peilmerk')
jest.mock('../../shared/services/vestiging/vestiging')

describe('The map detail service', () => {
  afterEach(() => {
    adressenLigplaats.mockReset()
    adressenNummeraanduiding.mockReset()
    napPeilmerk.mockReset()
    vestiging.mockReset()
  })

  it('calls the service fot the endpoint type specified', async () => {
    adressenLigplaats.mockImplementation(() => ({ type: 'ligplaats' }))
    expect(await detail('https://acc.api.data.amsterdam.nl/bag/ligplaats/123')).toEqual({
      isAuthorized: true,
      endpointType: 'bag/ligplaats/',
      type: 'ligplaats',
    })
    expect(adressenLigplaats).toHaveBeenCalledWith(
      'https://acc.api.data.amsterdam.nl/bag/ligplaats/123',
      undefined,
    )

    napPeilmerk.mockImplementation(() => ({ type: 'peilmerk' }))
    expect(await detail('https://acc.api.data.amsterdam.nl/nap/peilmerk/123')).toEqual({
      isAuthorized: true,
      endpointType: 'nap/peilmerk/',
      type: 'peilmerk',
    })
    expect(napPeilmerk).toHaveBeenCalledWith(
      'https://acc.api.data.amsterdam.nl/nap/peilmerk/123',
      undefined,
    )
  })

  describe('endpoint type nummeraanduiding', () => {
    it('returns endpoint type verblijfsobject by default', async () => {
      adressenNummeraanduiding.mockImplementation(() => ({
        type: 'nummeraanduiding',
      }))
      expect(await detail('https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123')).toEqual({
        isAuthorized: true,
        endpointType: 'bag/verblijfsobject/',
        type: 'nummeraanduiding',
      })
      expect(adressenNummeraanduiding).toHaveBeenCalledWith(
        'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123',
        undefined,
      )
    })

    it('returns endpoint type ligplaats when it is a ligplaats', async () => {
      adressenNummeraanduiding.mockImplementation(() => ({
        type: 'nummeraanduiding',
        ligplaats: true,
      }))
      expect(await detail('https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123')).toEqual({
        isAuthorized: true,
        endpointType: 'bag/ligplaats/',
        type: 'nummeraanduiding',
        ligplaats: true,
      })
      expect(adressenNummeraanduiding).toHaveBeenCalledWith(
        'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123',
        undefined,
      )
    })

    it('returns endpoint type standplaats when it is a standplaats', async () => {
      adressenNummeraanduiding.mockImplementation(() => ({
        type: 'nummeraanduiding',
        standplaats: true,
      }))
      expect(await detail('https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123')).toEqual({
        isAuthorized: true,
        endpointType: 'bag/standplaats/',
        type: 'nummeraanduiding',
        standplaats: true,
      })
      expect(adressenNummeraanduiding).toHaveBeenCalledWith(
        'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123',
        undefined,
      )
    })
  })

  it('does not call the service when the user does not have the required auth scope', async () => {
    vestiging.mockImplementation(() => ({ type: 'vestiging' }))
    expect(
      await detail('https://acc.api.data.amsterdam.nl/handelsregister/vestiging/123', {
        scopes: ['MON/R'],
      }),
    ).toEqual({ isAuthorized: false, endpointType: 'handelsregister/vestiging/' })
    expect(vestiging).not.toHaveBeenCalled()
  })

  it('calls the service when the user has the required auth scope', async () => {
    vestiging.mockImplementation(() => ({ type: 'vestiging' }))
    const user = {
      scopes: ['MON/R', 'HR/R'],
    }
    expect(
      await detail('https://acc.api.data.amsterdam.nl/handelsregister/vestiging/123', user),
    ).toEqual({ isAuthorized: true, endpointType: 'handelsregister/vestiging/', type: 'vestiging' })
    expect(vestiging).toHaveBeenCalledWith(
      'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/123',
      user,
    )
  })
})
