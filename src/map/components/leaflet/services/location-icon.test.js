import locationIcon from './location-icon'

jest.mock('./icon-config.constant', () => ({
  LOCATION_MARKER: {
    foo: {
      iconUrl: '/foo.svg',
    },
    default: {
      iconUrl: '/default.svg',
    },
  },
}))

describe('locationIcon', () => {
  it('should return named icon', () => {
    const icon = locationIcon('foo')

    expect(icon.options.iconUrl).toBe('/foo.svg')
  })

  it('should return default icon when named doesnt exist', () => {
    const icon = locationIcon('foo123')

    expect(icon.options.iconUrl).toBe('/default.svg')
  })
})
