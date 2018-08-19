import { currentShape, disable, drawTool, enable, initialize, setPolygon } from './draw-tool';
import drawToolConfig from './draw-tool.config';

describe.only('draw-tool service', () => {
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

  const mockLeaflet = () => {
    domEventStopMock = jest.fn();
    addClassMock = jest.fn();
    enableTextSelectionMock = jest.fn();
    drawPolygonMock = jest.fn();
    editToolbarMock = () => ({
      getModeHandlers: () => [{
        handler: {}
      }]
    });
    featureGroupMock = jest.fn();
    geodesicAreaMock = jest.fn();
    readableAreaMock = jest.fn();
    formattedNumberMock = jest.fn();
    polygonMock = jest.fn();

    return {
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
  };


  beforeEach(() => {
    leafletOld = window.L;
    window.L = mockLeaflet();
    document.body.innerHTML = '<div id="leafletMap"></div>';
  });

  afterEach(() => {
    window.L = leafletOld;
    document.body.innerHTML = '';
  });


  describe('initialize', () => {
    it('sets up the leaflet components', () => {
      const leafletMap = {
        addLayer: jest.fn(),
        on: jest.fn()
      };

      initialize(leafletMap);

      expect(currentShape).toEqual({
        isConsistent: true,
        type: null,
        layer: null,
        layerPrev: null,
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
      expect(editToolbarMock().getModeHandlers()[0].handler).toEqual({});
      expect(leafletMap.addLayer).toHaveBeenCalledTimes(1);

      // total of all draw events + 1 map click event + 1 layeradd event
      expect(leafletMap.on).toHaveBeenCalledTimes(Object.keys(window.L.Draw.Event).length + 2);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      const onFinish = jest.fn();
      const onDrawingMode = jest.fn();
      const onUpdateShape = jest.fn();

      const leafletMap = {
        addLayer: jest.fn(),
        on: jest.fn()
      };

      initialize(leafletMap, drawToolConfig.MAP_OPTIONS, onFinish, onDrawingMode, onUpdateShape);

      drawTool.map = {
        ...drawTool.map,
        fire: jest.fn()
      };
      drawTool.drawShapeHandler = {
        ...drawTool.drawShapeHandler,
        enable: jest.fn(),
        disable: jest.fn(),
        completeShape: jest.fn(),
        _markers: []
      };

      drawTool.editShapeHandler = {
        ...drawTool.editShapeHandler,
        enable: jest.fn(),
        disable: jest.fn(),
        save: jest.fn()
      };
    });

    afterEach(() => {
    });

    describe('setPolygon', () => {
      let layer;
      beforeEach(() => {
        layer = {
          addLayer: jest.fn(),
          removeLayer: jest.fn(),
          bringToFront: jest.fn(),
          on: jest.fn(),
          off: jest.fn(),
          getLatLngs: jest.fn(),
          intersects: jest.fn()
        };
      });

      it('should set an empty polygon', () => {
        // Arrange
        const latLngs = [];
        // const latLngsPolygon = latLngs.map((latLng) => ({
        //   lat: latLng[0],
        //   lng: latLng[1],
        //   distanceTo: jest.fn(() => 1)
        // }));
        // drawTool.drawnItems = layer;
        // layer.getLatLngs.mockImplementation(() => ([latLngsPolygon]));
        // polygonMock.mockImplementation(() => ({ ...layer }));

        // Act
        setPolygon(latLngs);

        // Assert
        expect(currentShape.markers).toEqual(latLngs);
      });

      it('should setPolygon', () => {
        const latLngs = [
          [
            52.374592413412294,
            4.888771906266819
          ],
          [
            52.374557014193066,
            4.888724841471184
          ],
          [
            52.37452381016258,
            4.888778911181654
          ],
          [
            52.37455608226589,
            4.888835359085925
          ]
        ];

        // Arrange
        const latLngsPolygon = latLngs.map((latLng) => ({
          lat: latLng[0],
          lng: latLng[1],
          distanceTo: jest.fn(() => 1)
        }));
        drawTool.drawnItems = layer;
        layer.getLatLngs.mockImplementation(() => ([latLngsPolygon]));
        polygonMock.mockImplementation(() => ({ ...layer }));

        // Act
        setPolygon(latLngs);

        // Assert
        expect(currentShape.markers).toEqual(latLngs);

        // Act
        setPolygon([]);

        expect(currentShape.markers).toEqual([]);
      });
    });

    describe('enable', () => {
      it('should enable drawing when drawing mode is none', () => {
        enable();
        expect(drawTool.drawShapeHandler.enable).toHaveBeenCalledTimes(1);
      });

      it('should enable editing when drawing mode is none and shape already exists', () => {
        currentShape.layer = 'existing';
        enable();
        expect(drawTool.editShapeHandler.enable).toHaveBeenCalledTimes(1);
      });

      it('should do nothing when drawing mode is draw', () => {
        drawTool.drawingMode = 'draw';
        enable();
        expect(drawTool.editShapeHandler.enable).not.toHaveBeenCalled();
      });

      it('should do nothing when drawing mode is edit', () => {
        drawTool.drawingMode = 'edit';
        enable();
        expect(drawTool.editShapeHandler.enable).not.toHaveBeenCalled();
      });
    });

    describe('disable', () => {
      it('should disable drawing when drawing mode is draw', () => {
        drawTool.drawingMode = 'draw';
        disable();
        expect(drawTool.drawShapeHandler.disable).toHaveBeenCalledTimes(1);
      });

      it('should complete the shape when drawing mode is draw and shape already exists', () => {
        drawTool.drawingMode = 'draw';
        currentShape.markers = [1, 2];
        disable();
        expect(drawTool.drawShapeHandler.completeShape).toHaveBeenCalledTimes(1);
      });

      it('should save and disable drawing when drawing mode is edit', () => {
        drawTool.drawingMode = 'edit';
        disable();
        expect(drawTool.editShapeHandler.save).toHaveBeenCalledTimes(1);
        expect(drawTool.editShapeHandler.disable).toHaveBeenCalledTimes(1);
      });

      it('should do nothing when drawing mode is none', () => {
        disable();
        expect(drawTool.drawShapeHandler.disable).not.toHaveBeenCalled();
        expect(drawTool.drawShapeHandler.completeShape).not.toHaveBeenCalled();
        expect(drawTool.editShapeHandler.save).not.toHaveBeenCalled();
        expect(drawTool.editShapeHandler.disable).not.toHaveBeenCalled();
      });
    });
  });
});
