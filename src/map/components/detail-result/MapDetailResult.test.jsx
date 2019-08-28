import React from 'react'
import { shallow } from 'enzyme'
import MapDetailResult from './MapDetailResult'

const mockMapDetailData = {
  field: 'foo',
}

jest.mock('../../services/map-detail-fields', () => ({
  endpoint: () => mockMapDetailData,
  adressenNummeraanduiding: () => ({ ...mockMapDetailData, extraField: 'foo' }),
}))
jest.mock('../../services/map-detail', () => ({
  endpointTypes: {
    endpoint: 'endpoint',
    adressenVerblijfsobject: 'adressenVerblijfsobject',
    adressenNummeraanduiding: 'adressenNummeraanduiding',
  },
}))

describe('MapDetailResult', () => {
  let component
  let result

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display the detail panel', () => {
    result = {
      endpointType: 'endpoint',
    }

    component = shallow(
      <MapDetailResult
        result={result}
        panoUrl="panoUrl"
        onMaximize={jest.fn()}
        onPanoPreviewClick={jest.fn()}
      />,
    )

    expect(component.find('MapDetailPanel').exists()).toBeTruthy()
    expect(component.find('MapDetailPanel').props().result).toBe(mockMapDetailData)
  })

  it('should display the detail panel when "adressenVerblijfsobject"', () => {
    result = {
      endpointType: 'adressenVerblijfsobject',
    }

    component = shallow(
      <MapDetailResult
        result={result}
        panoUrl="panoUrl"
        onMaximize={jest.fn()}
        onPanoPreviewClick={jest.fn()}
      />,
    )

    expect(component.find('MapDetailPanel').exists()).toBeTruthy()
    expect(component.find('MapDetailPanel').props().result).toEqual({
      ...mockMapDetailData,
      extraField: 'foo',
    })
  })
})
