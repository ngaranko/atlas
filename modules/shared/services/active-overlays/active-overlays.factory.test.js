describe('The active overlays factory', () => {
    let activeOverlays,
        store,
        OVERLAYS,
        mockOverlays,
        mockLayers;

    beforeEach(() => {
        mockLayers = {
            nap: {
                url: 'maps/nap',
                label_short: 'Normaal Amsterdams Peil (NAP)',
                label_long: 'Normaal Amsterdams Peil (NAP)',
                layers: ['peilmerk_hoogte', 'peilmerk_label'],
                minZoom: 8,
                maxZoom: 16,
                legend: 'maps/nap?version=1.3.0&service=WMS&request=GetLegendG' +
                'raphic&sld_version=1.1.0&layer=NAP&format=image/png&STYLE=default',
                detailItem: 'peilmerk',
                detailFactor: 1
            },
            mbs: {
                url: 'maps/meetbouten?service=wms',
                label_short: 'Meetbouten - Status',
                label_long: 'Meetbouten - Status',
                layers: ['meetbouten_status', 'meetbouten_labels'],
                minZoom: 10,
                maxZoom: 16,
                legend: 'maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
                'LegendGraphic&sld_version=1.1.0&layer=meetbouten_status&format=image/png&STYLE=default',
                detailItem: 'meetbout',
                detailFactor: 1
            },
            mbz: {
                url: 'maps/meetbouten?service=wms',
                label_short: 'Meetbouten - Zaksnelheid',
                label_long: 'Meetbouten - Zaksnelheid',
                layers: ['meetbouten_zaksnelheid', 'meetbouten_labels'],
                minZoom: 12,
                maxZoom: 16,
                legend: 'maps/meetbouten?version=1.3.0&service=WMS&request=Get' +
                'LegendGraphic&sld_version=1.1.0&layer=meetbouten_zaksnelheid&format=image/png&STYLE=default',
                detailItem: 'meetbout',
                detailFactor: 1
            },
            tcmnmt: {
                url: 'maps/monumenten',
                label_short: 'Monumenten',
                label_long: 'Monumenten',
                layers: ['monument_coordinaten'],
                minZoom: 13,
                maxZoom: 15,
                legend: 'maps/monumenten?version=1.3.0&service' +
                '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=monument_coordinaten&format=' +
                'image/png&STYLE=default',
                noDetail: true
            }
        };

        angular.mock.module(
            'dpShared',
            {
                store: {
                    getState: angular.noop
                },
                overlays: {
                    SOURCES: mockLayers
                }
            }
        );

        angular.mock.inject((_activeOverlays_, _store_, _overlays_) => {
            activeOverlays = _activeOverlays_;
            store = _store_;
            OVERLAYS = _overlays_;
        });

        mockOverlays = {
            mbs: {
                id: 'mbs',
                isVisible: true
            },
            mbz: {
                id: 'mbz',
                isVisible: true
            },
            nap: {
                id: 'nap',
                isVisible: false
            },
            tcmnmt: {
                id: 'tcmnmt',
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
        activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.nap]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays.mbs, mockOverlays.nap]);

        activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
    });

    it('should get and set overlays and leave value when not changed', function () {
        activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);

        activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
        expect(activeOverlays.getOverlays()).toEqual([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
    });

    describe('isVisibleAtCurrentZoom', () => {
        it('should return if overlay is visible or not with zoom level from state', function () {
            expect(activeOverlays.isVisibleAtCurrentZoom('mbs')).toBeTruthy();
            expect(activeOverlays.isVisibleAtCurrentZoom('mbz')).toBeFalsy();
        });

        it('should return if overlay is visible or not with current zoom level', function () {
            expect(activeOverlays.isVisibleAtCurrentZoom('mbz', 11)).toBeFalsy();
            expect(activeOverlays.isVisibleAtCurrentZoom('mbz', 12)).toBeTruthy();

            expect(activeOverlays.isVisibleAtCurrentZoom('tcmnmt', 16)).toBeFalsy();
            expect(activeOverlays.isVisibleAtCurrentZoom('tcmnmt', 15)).toBeTruthy();
        });
    });

    describe('getVisibleOverlays', () => {
        beforeEach(() => {
            activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.nap]);
        });

        it('after setting overlays it should only return visible layers with zoom level from state', function () {
            expect(activeOverlays.getVisibleOverlays()).toEqual([mockLayers.mbs]);
        });

        it('after setting overlays it should only return visible layers with current zoom level', function () {
            expect(activeOverlays.getVisibleOverlays(9)).toEqual([]);
        });
    });

    describe('getOverlaysWarning', () => {
        it('after setting overlays it should only return visible layers with zoom level from state', function () {
            store.getState.and.returnValue({
                map: {
                    zoom: 13
                }
            });

            activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.tcmnmt]);

            expect(activeOverlays.getOverlaysWarning()).toBe('Monumenten');
        });

        it('after setting overlays it should only return visible layers with current zoom level', function () {
            activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.tcmnmt]);

            expect(activeOverlays.getOverlaysWarning(11)).toBe('');
        });
    });
});
