describe('The nearestDetail factory', () => {
    let $q,
        $rootScope,
        nearestDetail,
        api,
        store,
        user,
        ACTIONS,
        callback,
        mockLayers,
        mockedSearchResultsPeilmerken,
        mockedSearchResultsMeetbouten,
        mockedSearchResultsBouwblokken,
        mockedSearchResultsKot,
        mockedSearchResultsHoreca,
        mockedEmptySearchResults;

    const FAIL_ON_URI = 'FAIL_ON_URI';

    beforeEach(() => {
        angular.mock.module(
            'dpShared',
            {
                api: {
                    /* eslint-disable complexity */
                    getByUri: (endpoint, params) => {
                        /* eslint-enable complexity */
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
                                    case 'kadastraal_object':
                                        q.resolve(mockedSearchResultsKot);
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
                    display: '10481356',
                    distance: 8.9544566,
                    id: '10481356',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481356/'
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
                    display: '10481357',
                    distance: 1.8680990168263,
                    id: '10481357',
                    type: 'meetbouten/meetbout',
                    uri: 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/10481357/'
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

        mockedSearchResultsKot = {
            features: [{
                properties: {
                    display: 'ASD06 I 09882 G 0000',
                    distance: 0.0,
                    id: 'NL.KAD.OnroerendeZaak.11470988270000',
                    type: 'kadaster/kadastraal_object',
                    uri: 'https://acc.api.data.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11470988270000/'
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
                detailUrl: 'geosearch/search/',
                detailItem: 'peilmerk'
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
                detailUrl: 'geosearch/search/',
                detailItem: 'meetbout'
            },
            tcmnmt: {
                url: 'maps/monumenten',
                label_short: 'Monumenten',
                label_long: 'Monumenten',
                layers: ['monumenten'],
                minZoom: 8,
                maxZoom: 15,
                legend: 'maps/monumenten?version=1.3.0&service' +
                '=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=monument&format=' +
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
                detailUrl: 'geosearch/search/',
                detailItem: 'bouwblok',
                detailIsShape: true
            },
            kot: {
                url: 'maps/brk?service=wms',
                label_short: 'Kadastrale objecten',
                label_long: 'Kadastrale objecten',
                layers: ['kadastraal_object', 'kadastraal_object_label'],
                minZoom: 9,
                maxZoom: 16,
                legend: 'maps/brk?version=1.3.0&service=WMS&request=GetLegend' +
                'Graphic&sld_version=1.1.0&layer=kadastraal_object&format=image/png&STYLE=default',
                detailUrl: 'geosearch/search/',
                detailItem: 'kadastraal_object',
                detailIsShape: true
            },
            hrc: {
                authScope: 'HR/R',
                url: 'maps/handelsregister',
                label_short: 'Horeca',
                label_long: 'Horeca',
                layers: ['horeca', 'horeca_label'],
                minZoom: 11,
                maxZoom: 16,
                legend: 'maps/handelsregister?version=1.3.0&service=WMS&request=GetLe' +
                'gendGraphic&sld_version=1.1.0&layer=horeca&format=image/png&STYLE=default',
                detailUrl: 'handelsregister/geosearch/',
                detailItem: 'horeca'
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

        user = {
            authenticated: false,
            scopes: [],
            name: ''
        }

        spyOn(api, 'getByUri').and.callThrough();
        spyOn(store, 'dispatch');

        callback = jasmine.createSpy();
    });

    it('gets closest point with multiple point and shape layers in a location', () => {
        let found;

        nearestDetail
            .search([52.789, 4.987],
                [mockLayers.nap, mockLayers.mbs, mockLayers.hrc, mockLayers.bbn, mockLayers.kot], 11, callback, user)
            .then((results) => {
                found = results;
            });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(4);
        expect(callback).not.toHaveBeenCalled();

        // expect(api.getByUri).toHaveBeenCalledWith('handelsregister/geosearch/', {item: 'horeca', lat: 52.789,
            // lon: 4.987, radius: 16 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'peilmerk', lat: 52.789, lon: 4.987,
            radius: 16 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'meetbout', lat: 52.789, lon: 4.987,
            radius: 16 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'bouwblok', lat: 52.789, lon: 4.987,
            radius: 0 });
        expect(api.getByUri).toHaveBeenCalledWith('geosearch/search/', {item: 'kadastraal_object', lat: 52.789,
            lon: 4.987, radius: 0 });

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.MAP_HIGHLIGHT,
            payload: false
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.FETCH_DETAIL,
            payload: found.uri,
            skippedSearchResults: true
        });

        expect(found).toEqual(mockedSearchResultsMeetbouten.features[2].properties);
        expect(nearestDetail.getLocation()).toEqual([52.789, 4.987]);
    });

    it('gets called with authorized hr item in a location', () => {
        user.scopes = ['HR/R'];

        nearestDetail.search([52.789, 4.987], [mockLayers.hrc], 11, callback, user);

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(1);

        expect(api.getByUri).toHaveBeenCalledWith('handelsregister/geosearch/', {item: 'horeca', lat: 52.789,
            lon: 4.987, radius: 16 });
    });

    it('gets not called with unauthorized hr item in a location', () => {
        nearestDetail.search([52.789, 4.987], [mockLayers.hrc], 11, callback, user);

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(0);

        expect(api.getByUri).not.toHaveBeenCalledWith('handelsregister/geosearch/', {item: 'horeca', lat: 52.789,
            lon: 4.987, radius: 16 });
    });

    it('gets kadrastraal object shape when it is above bouwblokken layer in a location', () => {
        let found;

        nearestDetail
            .search([52.789, 4.987],
                [mockLayers.bbn, mockLayers.kot], 11, callback, user)
            .then((results) => {
                found = results;
            });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(2);
        expect(callback).not.toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(2);

        expect(found).toEqual(mockedSearchResultsKot.features[0].properties);
    });

    it('gets bouwblokken shape when it is above kadrastraal object layer in a location', () => {
        let found;

        nearestDetail
            .search([52.789, 4.987],
                [mockLayers.kot, mockLayers.bbn], 11, callback, user)
            .then((results) => {
                found = results;
            });

        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(2);
        expect(callback).not.toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledTimes(2);

        expect(found).toEqual(mockedSearchResultsBouwblokken.features[0].properties);
    });

    it('gets empty result list in geosearch data for layers without detailItem', () => {
        let found;

        nearestDetail.search([52.961, 4.735], [mockLayers.empty], 11, callback, user).then((results) => {
            found = results;
        });
        $rootScope.$apply();

        expect(api.getByUri).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledTimes(1);

        expect(api.getByUri).toHaveBeenCalledWith('empty/resultset/', {item: '', lat: 52.961, lon: 4.735,
            radius: 16 });

        expect(found).toBeUndefined();
        expect(nearestDetail.getLocation()).toEqual([52.961, 4.735]);
    });

    it('handles not existance of callback gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.tcmnmt], 11, user);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });

    it('handles rejected call gracefully', () => {
        nearestDetail.search([52.961, 4.735], [mockLayers.reject], 11, user);

        $rootScope.$apply();
        expect(callback).not.toHaveBeenCalled();
    });
});
