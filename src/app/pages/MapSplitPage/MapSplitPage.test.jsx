import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import MapSplitPage from './MapSplitPage'

describe('MapSplitPage', () => {
  it('should force the fullscreen view mode for detail pages without geometry', () => {
    const store = configureMockStore()({
      ui: { viewMode: 'kaart', isPrintMode: false, isEmbed: false, isEmbedPreview: false },
      map: { geometry: [] }, // detail pages without geometry only have a fullscreen viewMode
      location: { type: 'atlasRouter/DATA_DETAIL' },
      selection: { type: 'NONE' },
    })

    const component = shallow(<MapSplitPage />, { context: { store } })

    // the shouldShowFullScreen selected should return a value for the forceFullScreen prop
    expect(component.props().forceFullScreen).toBe(true)
  })
})
