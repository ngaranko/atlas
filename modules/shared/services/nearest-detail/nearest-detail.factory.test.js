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
        mockedSearchResultsBouwblokken,
        mockedSearchResultsHoreca,
        mockedEmptySearchResults,
        mockedSearchResults;

    const FAIL_ON_URI = 'FAIL_ON_URI';

    beforeEach(() => {
        angular.mock.module(
            'dpShared',
            {
                api: {
                    getByUri: (endpoint, params) => {
                        var q = $q.defer();

                        switch (endpoint) {
                            case 'empty/resultset/':
                                q.resolve(mockedEmptySearchResults);
                                break;

                            case 'geosearch/search/':
                                switch (params.item) {
                                    case 'peilmerk':
                                        q.resolve(mockedSearchResultsPeilmerken);
                                        break;
                                    case 'meetbout':
                                        q.resolve(mockedSearchResultsMeetbouten);
                                        break;
                                    case 'bouwblok':
                                        q.resolve(mockedSearchResultsBouwblokken);
                                        break;
                                }
                                break;
                            case 'handelsregister/geosearch/':
                                q.resolve(mockedSearchResultsHoreca);
                                break;
                            case 'FAIL_ON_URI':
                                q.reject(FAIL_ON_URI);
                                break;
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
                    distance: 1.8680990168263,
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
                    distance: 8.9544566,
                    id: '10481356',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481356/'
                }
            }],
            type: 'FeatureCollection'
        };

        mockedSearchResultsBouwblokken = {
            features: [{
                properties: {
                    display: 'YA05',
                    distance: 0,
                    id: '03630012100362',
                    type: 'gebieden/bouwblok',
                    uri: 'https://acc.api.data.amsterdam.nl/gebieden/bouwblok/03630012100362/'
                }
            }],
            type: 'FeatureCollection'
        };

        mockedSearchResultsHoreca = {
            'features': [{
                'properties': {
                    'display': 'Eet Smaakversterker',
                    'uri': 'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/000033166897/',
                    'type': 'handelsregister/vestiging',
                    'distance': 3.93865800505318
                }
            }, {
                'properties': {
                    'display': 'BnB Downtown',
                    'uri': 'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/000033689806/',
                    'type': 'handelsregister/vestiging',
                    'distance': 5.16247728242652
                }
            }]
        };

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
            bbn: {
                url: 'maps/gebieden?service=wms',
                label_short: 'Bouwblokken',
                label_long: 'Bouwblokken',
                layers: ['bouwblok', 'bouwblok_label'],
                minZoom: 11,
                maxZoom: 16,
                legend: 'maps/gebieden?version=1.3.0&service=WMS&request=GetLegend' +
                'Graphic&sld_version=1.1.0&layer=bouwblok&format=image/png&STYLE=default',
                detailItem: 'bouwblok'
            },
            hrc: {
                authorizationLevel: 'EMPLOYEE',
                url: 'maps/handelsregister',
                label_short: 'Horeca',
                label_long: 'Horeca',
                layers: ['horeca', 'horeca_label'],
                minZoom: 11,
                maxZoom: 16,
                legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
                'gendGraphic&sld_version=1.1.0&layer=horeca&format=image/png&STYLE=default',
                detailUrl: 'handelsregister/geosearch/',
                detailItem: 'horeca',
                detailFactor: 1
            },
            empty: {
                detailUrl: 'empty/resultset/',
                detailItem: ''
            },
            reject: {
                detailUrl: FAIL_ON_URI,
                detailItem: ''
            }
        };

        mockedSearchResults = [{
            display: 'Eet Smaakversterker',
            uri: 'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/000033166897/',
            type: 'handelsregister/vestiging',
            distance: 3.93865800505318
        }, {
            display: 'BnB Downtown',
            uri: 'https://acc.api.data.amsterdam.nl/handelsregister/vestiging/000033689806/',
            type: 'handelsregister/vestiging',
            distance: 5.16247728242652
        }, {
            display: '10481357',
            distance: 1.8680990168263,
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
            display: '10481356',
            distance: 8.9544566,
            id: '10481356',
            type: 'meetbouten/meetbout',
            uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481356/'
        }, {
            display: '26080006',
            distance: 6.66634767290042,
            id: '26080006',
            type: 'nap/peilmerk',
            uri: 'https://acc.api.data.amsterdam.nl/nap/peilmerk/26080006/'
        }, {
            display: 'YA05',
            distance: 0,
            id: '03630012100362',
            type: 'gebieden/bouwblok',
            uri: 'https://acc.api.data.amsterdam.nl/gebieden/bouwblok/03630012100362/'
        }];

        spyOn(api, 'getByUri').and.callThrough();
        spyOn(store, 'dispatch');

        callback = jasmine.createSpy();
    });

    it('gets geosearch data for multiple layers in a location', () => {
        let searchResults;

        nearestDetail
            .search([52.789, 4.987], [mockLayers.bbn, mockLayers.nap, mockLayers.mbs, mockLayers.hrc], 11, callback)
            .then((results) => {
                searchResults = results;
            });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(4);
        expect(callback).not.toHaveBeenCalled();

        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'bouwblok', lat: 52.789, lon: 4.987,
            radius: 0 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'peilmerk', lat: 52.789, lon: 4.987,
            radius: 16 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'meetbout', lat: 52.789, lon: 4.987,
            radius: 12.8 });
        expect(api.getByUri).toHaveBeenCalledWith('handelsregister/geosearch/', {item: 'horeca', lat: 52.789,
            lon: 4.987, radius: 16 });

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.MAP_HIGHLIGHT,
            payload: false
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.FETCH_DETAIL,
            payload: searchResults[0].uri
        });

        expect(searchResults).toEqual(mockedSearchResults);
        expect(nearestDetail.getLocation()).toEqual([52.789, 4.987]);
    });

    it('gets empty result list in geosearch data for layers without detailItem', () => {
        let searchResults;

        nearestDetail.search([52.961, 4.735], [mockLayers.empty], 11, callback).then((results) => {
            searchResults = results;
        });
        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);

        expect(api.getByUri).toHaveBeenCalledWith('empty/resultset/', {item: '', lat: 52.961, lon: 4.735,
            radius: 0 });

        expect(searchResults).toEqual([]);
        expect(nearestDetail.getLocation()).toEqual([52.961, 4.735]);
    });

    it('handles not existance of callback gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.tcmnmt], 11);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });

    it('handles rejected call gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.reject], 11);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });
});
