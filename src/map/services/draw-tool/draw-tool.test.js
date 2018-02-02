import { initialize, cancel, isEnabled, setPolygon, currentShape } from './draw-tool';
import drawToolConfig from './draw-tool-config'

// console.log('window.L', window.L);
// jest.mock('window.L');
// jest.mock('leaflet-draw');

let leafletMap;
let leafletOld;
let domEventStopMock;
let addClassMock;
let enableTextSelectionMock;
let drawPolygonMock;
let editToolbarMock;
let featureGroupMock;
let geodesicAreaMock;
let readableAreaMock;
let formattedNumberMock;
let polygonMock;

// console.log('leaflet', leaflet.map);
describe('Draw-tool service', () => {
  beforeEach(() => {
    leafletMap = {
      addLayer: jest.fn(),
      on: jest.fn()
    };

    domEventStopMock = jest.fn();
    addClassMock = jest.fn();
    enableTextSelectionMock = jest.fn();
    drawPolygonMock = jest.fn();
    editToolbarMock = () => ({
      getModeHandlers: () => [{
        handler: 'mock-handler'
      }]
    });
    featureGroupMock = jest.fn();
    geodesicAreaMock = jest.fn();
    readableAreaMock = jest.fn();
    formattedNumberMock = jest.fn();
    polygonMock = jest.fn();

    leafletOld = window.L;
    window.L = {
      DomEvent: {
        stop: domEventStopMock
      },
      DomUtil: {
        addClass: addClassMock,
        enableTextSelection: enableTextSelectionMock
      },
      Draw: {
        Event: {
          DRAWSTART: jest.fn(),
          DRAWVERTEX: jest.fn(),
          CREATED: jest.fn(),
          EDITSTART: jest.fn(),
          EDITVERTEX: jest.fn(),
          EDITSTOP: jest.fn(),
          DELETED: jest.fn()
        },
        Polygon: drawPolygonMock
      },
      drawLocal: {
        format: 'mock-format',
        edit: {
          handlers: {
            edit: {
              tooltip: {
                text: '',
                subtext: ''
              }
            }
          }
        }
      },
      EditToolbar: editToolbarMock,
      FeatureGroup: featureGroupMock,
      GeometryUtil: {
        geodesicArea: geodesicAreaMock,
        readableArea: readableAreaMock,
        formattedNumber: formattedNumberMock
      },
      Polygon: polygonMock
    };
  });

  afterEach(() => {
    window.L = leafletOld;
  });

  it('initialize and sets up the leaflet components', () => {
    initialize(leafletMap);

    expect(currentShape).toEqual({
      isConsistent: true,
      type: null,
      layer: null,
      markers: [],
      markersPrev: [],
      markersEdit: [],
      deleteMarker: {},
      markersMaxCount: drawToolConfig.MAX_MARKERS,
      area: 0,
      areaTxt: '',
      distance: 0,
      distanceTxt: ''
    });
    expect(window.L.drawLocal.format).toEqual({
      numeric: {
        delimiters: {
          thousands: '.',
          decimal: ','
        }
      }
    });
    expect(featureGroupMock).toHaveBeenCalledTimes(1);
    expect(drawPolygonMock).toHaveBeenCalledTimes(1);
    expect(editToolbarMock().getModeHandlers()[0].handler).toBe('mock-handler');
    expect(leafletMap.addLayer).toHaveBeenCalledTimes(1);

    // total of all draw events + 1 map click event
    expect(leafletMap.on).toHaveBeenCalledTimes(Object.keys(window.L.Draw.Event).length + 1);
  });
});
