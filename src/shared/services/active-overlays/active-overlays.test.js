import ActiveOverlaysDefault, { ActiveOverlays } from './active-overlays'
import getState from '../redux/get-state'

jest.mock('../redux/get-state')

describe('ActiveOverlays', () => {
  describe('static isVisibleAtCurrentZoom', () => {
    it("should return false is layer is not in mapLayers or when layer doesn't have a minZoom or maxZoom", () => {
      getState.mockImplementation(() => ({
        user: {},
        map: {
          zoom: 3,
        },
        mapLayers: [
          {
            id: 'biz',
          },
          {
            id: 2,
            legendItems: [
              {
                id: 'hvo',
              },
            ],
            authScope: true,
          },
        ],
      }))
      expect(ActiveOverlays.isVisibleAtCurrentZoom('hvo', 2)).toBe(false)
      expect(ActiveOverlays.isVisibleAtCurrentZoom('bladie', 1)).toBe(false)
    })
  })
  describe('getOverlays', () => {
    it('should return an array with the active layers', () => {
      getState.mockImplementation(() => ({
        user: {},
        mapLayers: [
          {
            id: 'biz',
          },
          {
            id: 2,
            legendItems: [
              {
                id: 'hvo',
              },
            ],
            authScope: true,
          },
        ],
      }))
      ActiveOverlaysDefault.allOverlays = [
        {
          id: 'biz',
        },
        {
          id: 'hvo',
        },
      ]
      expect(ActiveOverlaysDefault.getOverlays()).toEqual([
        {
          id: 'biz',
        },
      ])
    })

    it("should return an empty array when mapLayers doesn't contain a id matching the allOverlays", () => {
      getState.mockImplementation(() => ({
        user: {},
        mapLayers: [
          {
            id: 'pir',
          },
          {
            id: 2,
            legendItems: [
              {
                id: 'hvo',
              },
            ],
            authScope: true,
          },
        ],
      }))
      ActiveOverlaysDefault.allOverlays = [
        {
          id: 'biz',
        },
        {
          id: 'hvo',
        },
      ]
      expect(ActiveOverlaysDefault.getOverlays()).toEqual([])
    })
  })

  describe('getVisibleSources', () => {
    it('should return an empty array', () => {
      getState.mockImplementation(() => ({
        user: {},
        map: {
          zoom: 3,
        },
        mapLayers: [
          {
            id: 'biz',
          },
          {
            id: 2,
            legendItems: [
              {
                id: 'hvo',
              },
            ],
            authScope: true,
          },
        ],
      }))
      ActiveOverlaysDefault.allOverlays = [
        {
          id: 'biz',
          isVisible: true,
        },
        {
          id: 'hvo',
        },
      ]
      expect(ActiveOverlaysDefault.getVisibleSources('biz')).toEqual([])
    })

    it('should filter', () => {
      getState.mockImplementation(() => ({
        user: {},
        map: {
          zoom: 3,
        },
        mapLayers: [
          {
            id: 'biz',
          },
          {
            id: 2,
            legendItems: [
              {
                id: 'hvo',
              },
            ],
            authScope: true,
          },
        ],
      }))
      ActiveOverlaysDefault.allOverlays = [
        {
          id: 'biz',
          isVisible: true,
        },
        {
          id: 'hvo',
        },
      ]
      ActiveOverlaysDefault.isVisibleAtCurrentZoom = jest.fn().mockReturnValue(true)
      expect(ActiveOverlaysDefault.getVisibleSources('biz')).toEqual([])
    })
  })

  describe('getOverlaysWarning', () => {
    it('should return an empty string', () => {
      ActiveOverlays.isAuthorised = jest.fn().mockImplementation(() => true)
      ActiveOverlays.isVisibleAtCurrentZoom = jest.fn().mockImplementation(() => true)
      ActiveOverlaysDefault.allOverlays = [
        {
          id: 'biz',
          isVisible: true,
        },
        {
          id: 'hvo',
          isVisible: true,
        },
      ]
      expect(ActiveOverlaysDefault.getOverlaysWarning(1)).toBe('')
    })

    it('should build a string from an array of objects that have a label_short and noDetail key set to true', () => {
      ActiveOverlaysDefault.getVisibleSources = jest.fn().mockImplementation(() => [
        {
          noDetail: true,
          label_short: 'label one',
        },
        {
          noDetail: true,
          label_short: 'label two',
        },
      ])

      expect(ActiveOverlaysDefault.getOverlaysWarning(1)).toBe('label one, label two')
    })
  })
})
