describe('The nearestDetail factory', () => {
    let $q,
        $rootScope,
        nearestDetail,
        api,
        store,
        ACTIONS,
        callback,
        mockLayers,
        mockedSearchResultsPeilmerken,
        mockedSearchResultsMeetbouten,
        mockedEmptySearchResults,
        mockedSearchResults;

    const FAIL_ON_URI = 'FAIL_ON_URI';

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                api: {
                    getByUri: function (endpoint, params) {
                        var q = $q.defer();

                        if (params.item === 'peilmerk') {
                            q.resolve(mockedSearchResultsPeilmerken);
                        } else if (params.item === 'meetbout') {
                            q.resolve(mockedSearchResultsMeetbouten);
                        } else if (params.item === FAIL_ON_URI) {
                            q.reject(FAIL_ON_URI);
                        } else {
                            q.resolve(mockedEmptySearchResults);
                        }

                        return q.promise;
                    }
                },
                store: {
                    dispatch: angular.noop
                },
                mapConfig: {
                    BASE_LAYER_OPTIONS: {
                        maxZoom: 16
                    }
                }
            }
        );

        angular.mock.inject(function (_$q_, _$rootScope_, _store_, _nearestDetail_, _api_, _ACTIONS_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            store = _store_;
            nearestDetail = _nearestDetail_;
            api = _api_;
            ACTIONS = _ACTIONS_;
        });

        mockedEmptySearchResults = {
            type: 'FeatureCollection',
            features: []
        };

        mockedSearchResultsPeilmerken = {
            features: [{
                properties: {
                    display: '26080006',
                    distance: 6.66634767290042,
                    id: '26080006',
                    type: 'nap/peilmerk',
                    uri: 'https://acc.api.data.amsterdam.nl/nap/peilmerk/26080006/'
                }
            }],
            type: 'FeatureCollection'
        };

        mockedSearchResultsMeetbouten = {
            features: [{
                properties: {
                    display: '10481357',
                    distance: 2.8680990168263,
                    id: '10481357',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481357/'
                }
            },
            {
                properties: {
                    display: '10481358',
                    distance: 3.40987232417753,
                    id: '10481358',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481358/'
                }
            },
            {
                properties: {
                    display: '10481356',
                    distance: 1.9544566,
                    id: '10481356',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481356/'
                }
            }],
            type: 'FeatureCollection'
        };

        mockedSearchResults = [{
            display: '10481356',
            distance: 1.9544566,
            id: '10481356',
            type: 'meetbouten/meetbout',
            uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481356/'
        }, {
            display: '10481357',
            distance: 2.8680990168263,
            id: '10481357',
            type: 'meetbouten/meetbout',
            uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481357/'
        }, {
            display: '10481358',
            distance: 3.40987232417753,
            id: '10481358',
            type: 'meetbouten/meetbout',
            uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481358/'
        }, {
            display: '26080006',
            distance: 6.66634767290042,
            id: '26080006',
            type: 'nap/peilmerk',
            uri: 'https://acc.api.data.amsterdam.nl/nap/peilmerk/26080006/'
        }];

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
                detailFactor: 0.8
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
            },
            reject: {
                detailItem: FAIL_ON_URI
            }
        };

        spyOn(api, 'getByUri').and.callThrough();
        spyOn(store, 'dispatch');

        callback = jasmine.createSpy();
    });

    it('gets geosearch data for multiple layers in a location', () => {
        nearestDetail.search([52.789, 4.987], [mockLayers.nap, mockLayers.mbs], 11, callback);

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(2);
        expect(callback).not.toHaveBeenCalled();

        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'peilmerk', lat: 52.789, lon: 4.987,
            radius: 16 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'meetbout', lat: 52.789, lon: 4.987,
            radius: 12.8 });

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.MAP_HIGHLIGHT,
            payload: false
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.FETCH_DETAIL,
            payload: nearestDetail.getResults()[0].uri
        });

        expect(nearestDetail.getResults()).toEqual(mockedSearchResults);
        expect(nearestDetail.getLocation()).toEqual([52.789, 4.987]);
    });

    it('gets empty result list in geosearch data for layers without detailItem', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.tcmnmt], 11, callback);

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);

        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: undefined, lat: 52.961, lon: 4.735,
            radius: 16 });

        expect(nearestDetail.getResults()).toEqual([]);
        expect(nearestDetail.getLocation()).toEqual([52.961, 4.735]);
    });

    it('handles not existance of callback gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.tcmnmt], 11);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });

    it('handles not rejected call gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.reject], 11);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });
});
