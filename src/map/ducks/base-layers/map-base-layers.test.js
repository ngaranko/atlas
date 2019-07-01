import reducer, {
  FETCH_MAP_BASE_LAYERS_REQUEST,
  FETCH_MAP_BASE_LAYERS_SUCCESS,
  FETCH_MAP_BASE_LAYERS_FAILURE,
  fetchMapBaseLayers,
  getBaseLayers,
  getUrlTemplate,
} from './map-base-layers'

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_MAP_BASE_LAYERS_REQUEST', () => {
    const startAction = {
      type: FETCH_MAP_BASE_LAYERS_REQUEST,
    }
    expect(reducer({}, startAction)).toEqual({
      error: null,
      isLoading: true,
    })
  })

  it('should handle FETCH_MAP_BASE_LAYERS_SUCCESS', () => {
    const successAction = {
      type: FETCH_MAP_BASE_LAYERS_SUCCESS,
      mapBaseLayers: [{ id: 1 }],
    }
    expect(reducer({}, successAction)).toEqual({
      isLoading: false,
      items: [...successAction.mapBaseLayers],
    })
  })

  it('should handle FETCH_MAP_BASE_LAYERS_FAILURE', () => {
    const updateAction = {
      type: FETCH_MAP_BASE_LAYERS_FAILURE,
      error: 'Error',
    }
    expect(reducer({}, updateAction)).toEqual({
      error: 'Error',
      isLoading: false,
    })
  })
})

// SELECTORS
describe('mapBaseLayers selectors', () => {
  const baseLayers = [
    {
      value: 'topografie',
      label: 'Topografie',
      category: 'topography',
      selected: true,
      urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
    },
    {
      value: 'topo_rd_light',
      category: 'topography',
      label: 'Topografie licht',
      urlTemplate:
        'https://{s}.data.amsterdam.nl/topo_rd_light/{z}/{x}/{y}.png',
    },
    {
      value: 'lf2016',
      label: 'Luchtfoto 2016',
      category: 'aerial',
      selected: true,
      urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2016_RD/{z}/{x}/{y}.jpeg',
    },
  ]
  describe('getBaseLayers', () => {
    it('should return an object categorized', () => {
      const selected = getBaseLayers.resultFunc(baseLayers)
      expect(selected).toEqual({
        aerial: [baseLayers[2]],
        topography: [baseLayers[0], baseLayers[1]],
      })
    })

    it('should return an empty object if there are no baseLayers', () => {
      const selected = getBaseLayers.resultFunc([])
      expect(selected).toEqual({})
    })
  })
  describe('getUrlTemplate', () => {
    it('should return the urlTemplate of the active baseLayer', () => {
      const selected = getUrlTemplate.resultFunc(
        baseLayers,
        baseLayers[0].value,
      )
      expect(selected).toEqual(baseLayers[0].urlTemplate)
    })
  })
})

// ACTION CREATORS
describe('actions', () => {
  describe('fetchMapBaseLayers', () => {
    it('should create an action to request map baseLayers', () => {
      const expectedAction = {
        type: FETCH_MAP_BASE_LAYERS_REQUEST,
      }
      expect(fetchMapBaseLayers()).toEqual(expectedAction)
    })
  })
})
