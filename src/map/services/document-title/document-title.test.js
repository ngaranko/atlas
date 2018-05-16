import * as documentTitle from './document-title';
import { selectActivePanelLayers } from '../../ducks/panel-layers/map-panel-layers';

jest.mock('../../ducks/panel-layers/map-panel-layers');

let mockState;

describe('Draw-tool service', () => {
  beforeEach(() => {
  });

  it('returns a default title with promise', () => {
    mockState = { map: { zoom: 0 } };
    selectActivePanelLayers.mockImplementation(() => ([{}]));
    const promise = documentTitle.getTitle(mockState);
    promise.then((value) => {
      expect(value).toBe('Grote kaart');
    });
  });

  it('returns a title with one active layer', () => {
    mockState = { map: { zoom: 0 } };
    selectActivePanelLayers.mockImplementation(() => ([{ title: 'Geselecteerde laag' }]));
    const promise = documentTitle.getTitle(mockState);
    promise.then((value) => {
      expect(value).toBe('Geselecteerde laag | Grote kaart');
    });
  });

  it('returns a title with multiple active layer', () => {
    mockState = { map: { zoom: 0 } };
    selectActivePanelLayers.mockImplementation(() => ([
        { title: 'Geselecteerde laag' },
        { title: 'Tweede laag' }
    ]));
    const promise = documentTitle.getTitle(mockState);
    promise.then((value) => {
      expect(value).toBe('Geselecteerde laag, Tweede laag | Grote kaart');
    });
  });
});
