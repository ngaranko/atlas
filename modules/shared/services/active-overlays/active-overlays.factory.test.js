import SOURCES from '../../../../src/shared/services/layers/overlays.constant';

const objectContains = (contained, container) => {
    return Object.keys(contained).every((key) => contained[key] === container[key]);
};

const getFirstMatchingLayerProperty = (matchingObject) => {
    return Object.keys(SOURCES).find((key) => {
        return objectContains(matchingObject, SOURCES[key]);
    });
};

describe('The active overlays factory', () => {
    let activeOverlays,
        store,
        mockOverlays;

    const firstLayerProp = getFirstMatchingLayerProperty({
        detailUrl: 'geosearch/search/',
        detailItem: 'peilmerk'
    });

    const secondLayerProp = getFirstMatchingLayerProperty({
        detailUrl: 'geosearch/search/',
        detailItem: 'meetbout'
    });

    const thirthLayerProp = getFirstMatchingLayerProperty({
        minZoom: 12,
        maxZoom: 16,
        detailUrl: 'geosearch/search/',
        detailItem: 'meetbout'
    });

    const fourthLayerProp = getFirstMatchingLayerProperty({
        noDetail: true
    });

    const fifthLayerProp = getFirstMatchingLayerProperty({
        minZoom: 8,
        maxZoom: 16
    });

    beforeEach(() => {
        angular.mock.module(
            'dpShared',
            {
                store: {
                    getState: angular.noop
                }
            }
        );

        angular.mock.inject((_activeOverlays_, _store_) => {
            activeOverlays = _activeOverlays_;
            store = _store_;
        });

        mockOverlays = {
            [firstLayerProp]: {
                id: firstLayerProp,
                isVisible: true
            },
            [secondLayerProp]: {
                id: [secondLayerProp],
                isVisible: true
            },
            [thirthLayerProp]: {
                id: thirthLayerProp,
                isVisible: false
            },
            [fourthLayerProp]: {
                id: fourthLayerProp,
                isVisible: true
            },
            [fifthLayerProp]: {
                id: fifthLayerProp,
                isVisible: true
            }
        };

        spyOn(store, 'getState').and.returnValue({
            map: {
                zoom: 11
            }
        });
    });

    it('default overlays should be empty', function () {
        expect(activeOverlays.getOverlays()).toEqual([]);
    });

    it('should get and set overlays', function () {
        activeOverlays.setOverlays([mockOverlays[firstLayerProp]]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays[firstLayerProp]]);

        activeOverlays.setOverlays([mockOverlays[firstLayerProp], mockOverlays[secondLayerProp]]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays[firstLayerProp], mockOverlays[secondLayerProp]]);
    });

    it('should get and set overlays and leave value when not changed', function () {
        activeOverlays.setOverlays([mockOverlays[firstLayerProp], mockOverlays[secondLayerProp]]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays[firstLayerProp], mockOverlays[secondLayerProp]]);

        activeOverlays.setOverlays([mockOverlays[fifthLayerProp], mockOverlays[firstLayerProp]]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays[fifthLayerProp], mockOverlays[firstLayerProp]]);
    });

    describe('isVisibleAtCurrentZoom', () => {
        it('should return if overlay is visible or not with zoom level from state', function () {
            expect(activeOverlays.isVisibleAtCurrentZoom(firstLayerProp)).toBeTruthy();
            expect(activeOverlays.isVisibleAtCurrentZoom(thirthLayerProp)).toBeFalsy();
        });

        it('should return if overlay is visible or not with current zoom level', function () {
            expect(activeOverlays.isVisibleAtCurrentZoom(thirthLayerProp, 11)).toBeFalsy();
            expect(activeOverlays.isVisibleAtCurrentZoom(thirthLayerProp, 12)).toBeTruthy();

            expect(activeOverlays.isVisibleAtCurrentZoom(fifthLayerProp, 7)).toBeFalsy();
            expect(activeOverlays.isVisibleAtCurrentZoom(fifthLayerProp, 15)).toBeTruthy();

            expect(activeOverlays.isVisibleAtCurrentZoom('not_existing')).toBeFalsy();
        });
    });

    describe('getVisibleOverlays', () => {
        beforeEach(() => {
            activeOverlays.setOverlays([mockOverlays[secondLayerProp], mockOverlays[firstLayerProp]]);
        });

        it('after setting overlays it should only return visible layers with zoom level from state', function () {
            expect(activeOverlays.getVisibleOverlays()).toEqual([SOURCES[firstLayerProp]]);
        });

        it('after setting overlays it should only return visible layers with current zoom level', function () {
            expect(activeOverlays.getVisibleOverlays(9)).toEqual([]);
        });
    });

    describe('getOverlaysWarning and getOverlaysLabels', () => {
        it('after setting overlays it should only return visible layers with zoom level from state', function () {
            store.getState.and.returnValue({
                map: {
                    zoom: 13
                }
            });

            activeOverlays.setOverlays([mockOverlays[secondLayerProp], mockOverlays[fourthLayerProp]]);

            expect(activeOverlays.getOverlaysWarning()).toBe(SOURCES[fourthLayerProp].label_long);
            expect(activeOverlays.getOverlaysLabels()).toBe(SOURCES[fourthLayerProp].parent_label);
        });

        it('after setting overlays it should only return visible layers with current zoom level', function () {
            activeOverlays.setOverlays([mockOverlays[secondLayerProp], mockOverlays[fourthLayerProp]]);

            expect(activeOverlays.getOverlaysWarning(7)).toBe('');
            expect(activeOverlays.getOverlaysLabels()).toBe(SOURCES[fourthLayerProp].parent_label);
        });
    });
});
