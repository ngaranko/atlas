import { testSaga, expectSaga } from 'redux-saga-test-plan'

import watchFetchMapPanelLayers, { fetchPanelLayers } from './map-panel-layers'

import {
  FETCH_PANEL_ITEMS_REQUEST,
  FETCH_PANEL_ITEMS_SUCCESS,
  FETCH_PANEL_ITEMS_FAILURE,
} from '../../ducks/panel-layers/map-panel-layers'

import { getPanelLayers } from '../../services'

describe('watchFetchMapPanelLayers', () => {
  const action = { type: FETCH_PANEL_ITEMS_REQUEST }

  it('should watch FETCH_PANEL_ITEMS_REQUEST and call fetchPanelLayers', () => {
    testSaga(watchFetchMapPanelLayers)
      .next()
      .takeLatestEffect(FETCH_PANEL_ITEMS_REQUEST, fetchPanelLayers)
      .next(action)
      .isDone()
  })
})

describe('fetchPanelLayers', () => {
  it('should call getMapBaseLayers and dispatch the correct action', () =>
    expectSaga(fetchPanelLayers)
      .provide({
        call(effect, next) {
          return effect.fn === getPanelLayers ? 'panelLayers' : next()
        },
      })
      .put({
        type: FETCH_PANEL_ITEMS_SUCCESS,
        panelLayers: 'panelLayers',
      })
      .run())

  it('should throw error and put error', () => {
    const error = new Error('My Error')
    testSaga(fetchPanelLayers)
      .next()
      .throw(error)
      .put({ type: FETCH_PANEL_ITEMS_FAILURE, error })
      .next()
      .isDone()
  })
})
