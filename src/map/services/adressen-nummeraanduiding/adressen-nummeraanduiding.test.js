import fetchByUri, {
  fetchByPandId,
  fetchByLigplaatsId,
  fetchHoofdadresByLigplaatsId,
  fetchByStandplaatsId,
  fetchHoofdadresByStandplaatsId,
} from './adressen-nummeraanduiding'
import { adressenVerblijfsobject } from '../normalize/normalize'
import { getByUrl } from '../../../shared/services/api/api'

jest.mock('../api/api')
jest.mock('./adressen-adressenVerblijfsobject')

describe('The adressen nummeraanduiding resource', () => {
  afterEach(() => {
    getByUrl.mockReset()
  })

  describe('By uri', () => {
    it('fetches a nummeraanduiding', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123456'

      getByUrl.mockReturnValueOnce(
        Promise.resolve({
          _display: 'Address display name 1',
          hoofdadres: true,
          landelijk_id: 'abc123',
          adressenVerblijfsobject:
            'https://acc.api.data.amsterdam.nl/bag/adressenVerblijfsobject/345678',
        }),
      )
      adressenVerblijfsobject.mockImplementation(
        () =>
          new Promise(resolve => {
            resolve({
              label: 'adressenVerblijfsobject',
              oppervlakte: '119',
            })
          }),
      )

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          label: 'Address display name 1',
          isNevenadres: false,
          oppervlakte: '119',
        })
        expect(adressenVerblijfsobject).toHaveBeenCalledWith(
          'https://acc.api.data.amsterdam.nl/bag/adressenVerblijfsobject/345678',
        )
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches without adressenVerblijfsobject', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123456'

      getByUrl.mockReturnValueOnce(
        Promise.resolve({
          _display: 'Address display name 1',
          hoofdadres: false,
          landelijk_id: 'abc123',
        }),
      )

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({
          _display: 'Address display name 1',
          isNevenadres: true,
          hoofdadres: false,
          label: 'Address display name 1',
          landelijk_id: 'abc123',
        })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/123456'

      getByUrl.mockReturnValueOnce(Promise.resolve({}))

      const promise = fetchByUri(uri).then(response => {
        expect(response).toEqual({ isNevenadres: true, label: undefined })
      })

      expect(getByUrl).toHaveBeenCalledWith(uri)
      return promise
    })
  })

  it('can fetch nummeraanduidingen by pand id', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: 'abc123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: 'xyz456',
          },
        ],
      }),
    )

    const promise = fetchByPandId(1).then(response => {
      expect(response).toEqual([
        {
          _display: 'Address display name 1',
          landelijk_id: 'abc123',
        },
        {
          _display: 'Address display name 2',
          landelijk_id: 'xyz456',
        },
      ])
    })

    expect(getByUrl.mock.calls[0][0]).toContain('pand=1')
    return promise
  })

  it('can fetch nummeraanduidingen by ligplaats id, adds `id` attribute', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: 'abc123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: 'xyz456',
          },
        ],
      }),
    )

    const promise = fetchByLigplaatsId('abc123').then(response => {
      expect(response).toEqual([
        {
          _display: 'Address display name 1',
          landelijk_id: 'abc123',
          id: 'abc123',
        },
        {
          _display: 'Address display name 2',
          landelijk_id: 'xyz456',
          id: 'xyz456',
        },
      ])
    })

    expect(getByUrl.mock.calls[0][0]).toContain('ligplaats=abc123')
    return promise
  })

  it('can fetch the hoofdadres by ligplaats id', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: '123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: '456',
            hoofdadres: {},
          },
          {
            _display: 'Address display name 3',
            landelijk_id: '789',
          },
        ],
      }),
    )

    const promise = fetchHoofdadresByLigplaatsId('abc123').then(response => {
      expect(response).toEqual({
        _display: 'Address display name 2',
        landelijk_id: '456',
        id: '456',
        hoofdadres: {},
      })
    })

    expect(getByUrl.mock.calls[0][0]).toContain('ligplaats=abc123')
    return promise
  })

  it('fetching the hoofdadres by ligplaats id when not available', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: '123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: '456',
          },
        ],
      }),
    )

    const promise = fetchHoofdadresByLigplaatsId('abc123').then(response => {
      expect(response).not.toBeDefined()
    })

    expect(getByUrl.mock.calls[0][0]).toContain('ligplaats=abc123')
    return promise
  })

  it('can fetch nummeraanduidingen by standplaats id, adds `id` attribute', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: 'abc123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: 'xyz456',
          },
        ],
      }),
    )

    const promise = fetchByStandplaatsId('abc123').then(response => {
      expect(response).toEqual([
        {
          _display: 'Address display name 1',
          landelijk_id: 'abc123',
          id: 'abc123',
        },
        {
          _display: 'Address display name 2',
          landelijk_id: 'xyz456',
          id: 'xyz456',
        },
      ])
    })

    expect(getByUrl.mock.calls[0][0]).toContain('standplaats=abc123')
    return promise
  })

  it('can fetch the hoofdadres by standplaats id', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: '123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: '456',
            hoofdadres: {},
          },
          {
            _display: 'Address display name 3',
            landelijk_id: '789',
          },
        ],
      }),
    )

    const promise = fetchHoofdadresByStandplaatsId('abc123').then(response => {
      expect(response).toEqual({
        _display: 'Address display name 2',
        landelijk_id: '456',
        id: '456',
        hoofdadres: {},
      })
    })

    expect(getByUrl.mock.calls[0][0]).toContain('standplaats=abc123')
    return promise
  })

  it('fetching the hoofdadres by standplaats id when not available', () => {
    getByUrl.mockReturnValueOnce(
      Promise.resolve({
        results: [
          {
            _display: 'Address display name 1',
            landelijk_id: '123',
          },
          {
            _display: 'Address display name 2',
            landelijk_id: '456',
          },
        ],
      }),
    )

    const promise = fetchHoofdadresByStandplaatsId('abc123').then(response => {
      expect(response).not.toBeDefined()
    })

    expect(getByUrl.mock.calls[0][0]).toContain('standplaats=abc123')
    return promise
  })
})
