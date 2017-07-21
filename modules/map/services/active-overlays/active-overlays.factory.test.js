fdescribe('The active overlays factory', () => {
    let activeOverlays,
        store,
        overlays,
        mockOverlays,
        mockLayers,
        mockState;

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
                detail_item: 'peilmerk',
                detail_radius: 50
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
                detail_item: 'meetbout',
                detail_radius: 50
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
                detail_item: 'meetbout',
                detail_radius: 50
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
                'image/png&STYLE=default'
            }
        };

        angular.mock.module(
            'dpMap',
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
            overlays = _overlays_;
        });

        mockState = {
            map: {
                zoom: 11
            }
        };

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
                isVisible: true
            },
            tcmnmt: {
                id: 'tcmnmt',
                isVisible: true
            }
        };

        spyOn(store, 'getState').and.returnValue(mockState);
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

    it('should return if overlay is visible or not with current zoom level', function () {
        expect(activeOverlays.isVisibleAtCurrentZoom('mbs', 9)).toBeFalsy();
        expect(activeOverlays.isVisibleAtCurrentZoom('mbs', 10)).toBeTruthy();

        expect(activeOverlays.isVisibleAtCurrentZoom('tcmnmt', 16)).toBeFalsy();
        expect(activeOverlays.isVisibleAtCurrentZoom('tcmnmt', 15)).toBeTruthy();
    });

    // it('should get detail overlays that are only visible with certain zoom level', function () {
    //     activeOverlays.setOverlays([mockOverlays.mbs, mockOverlays.mbz, mockOverlays.nap]);
    //     expect(activeOverlays.getOverlays()).toEqual([mockOverlays.mbs, mockOverlays.nap]);
    // });
});
