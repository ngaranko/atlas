import SHARED_CONFIG from './shared-config'

describe('The sharedConfig service', () => {
  it('gives you the configuration based on global environment', () => {
    expect(SHARED_CONFIG).toMatchSnapshot()
  })
})
