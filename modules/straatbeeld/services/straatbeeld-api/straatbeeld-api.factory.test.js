describe('The straatbeeldApi Factory', () => {
    let straatbeeldApi,
        geojson,
        $q,
        api,
        $rootScope,
        cancel;

    beforeEach(() => {
        angular.mock.module(
            'dpStraatbeeld',
            {
                sharedConfig: {
                    API_ROOT: 'http://pano.amsterdam.nl/',
                    RADIUS: 100
                },
                geojson: {
                    getCenter: () => {
                        return [52.3747994036985, 4.91359770418102];
                    }
                },
                api: {
                    getByUrl: function (url, params, _cancel) {
                        cancel = _cancel;

                        const q = $q.defer();

                        q.resolve({
                            _embedded: {
                                adjacencies: [{
                                    pano_id: 'TMX7315120208-000054_pano_0002_000177',
                                    direction: 116.48,
                                    distance: 10.14,
                                    year: 2016,
                                    cubic_img_baseurl: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg',
                                    cubic_img_pattern: 'http://pano.amsterdam.nl/all/cubic/abf123/{a}/{b}/{c}.jpg',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [
                                            4.91359770418102,
                                            52.3747994036985,
                                            46.9912552172318
                                        ]
                                    },
                                    timestamp: '2016-05-19T13:04:15.341110Z'
                                },
                                {
                                    pano_id: 'TMX7315120208-000054_pano_0002_000178',
                                    direction: 127.37,
                                    distance: 5.25,
                                    year: 2017,
                                    cubic_img_baseurl: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg',
                                    cubic_img_pattern: 'http://pano.amsterdam.nl/all/cubic/abf123/{a}/{b}/{c}.jpg',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [
                                            4.91359770418102,
                                            52.3747994036985,
                                            46.9912552172318
                                        ]
                                    },
                                    timestamp: '2017-05-19T13:04:15.341110Z'
                                }],
                                panoramas: [{
                                    pano_id: 'TMX7315120208-000054_pano_0002_000177',
                                    direction: 116.48,
                                    distance: 10.14,
                                    year: 2016,
                                    cubic_img_baseurl: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg',
                                    cubic_img_pattern: 'http://pano.amsterdam.nl/all/cubic/abf123/{a}/{b}/{c}.jpg',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [
                                            4.91359770418102,
                                            52.3747994036985,
                                            46.9912552172318
                                        ]
                                    },
                                    timestamp: '2016-05-19T13:04:15.341110Z'
                                },
                                {
                                    pano_id: 'TMX7315120208-000054_pano_0002_000178',
                                    direction: 127.37,
                                    distance: 5.25,
                                    year: 2017,
                                    cubic_img_baseurl: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg',
                                    cubic_img_pattern: 'http://pano.amsterdam.nl/all/cubic/abf123/{a}/{b}/{c}.jpg',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: [
                                            4.91359770418102,
                                            52.3747994036985,
                                            46.9912552172318
                                        ]
                                    },
                                    timestamp: '2017-05-19T13:04:15.341110Z'
                                }]
                            }
                        });

                        return q.promise;
                    }
                }
            },
            function ($provide) {
                $provide.constant('STRAATBEELD_CONFIG', {
                    STRAATBEELD_ENDPOINT_PREFIX: 'panorama/panoramas',
                    STRAATBEELD_ENDPOINT_SUFFIX: 'adjacencies',
                    MAX_RADIUS: 250,
                    SRID: 4326
                });
            }
        );

        angular.mock.inject(function (_straatbeeldApi_, _geojson_, _$q_, _api_, _$rootScope_) {
            straatbeeldApi = _straatbeeldApi_;
            geojson = _geojson_;
            $q = _$q_;
            api = _api_;
            $rootScope = _$rootScope_;
        });
    });

    it('calls the API factory with the correct endpoint for id', () => {
        spyOn(api, 'getByUrl').and.callThrough();

        straatbeeldApi.getImageDataById('ABC');

        expect(api.getByUrl).toHaveBeenCalledWith(
            'http://pano.amsterdam.nl/panorama/panoramas/ABC/adjacencies?newest_in_range=true&radius=250',
            undefined,
            jasmine.anything()
        ); // Test the last argument for being a promise lateron
    });

    it('cancels any outstanding call to the API factory when loading a new straatbeeld by id', () => {
        spyOn(api, 'getByUrl').and.callThrough();
        let cancelled = false;

        straatbeeldApi.getImageDataById('ABC');
        cancel.promise.then(() => {
            cancelled = true;
            fail(); // 1 outstanding request should not be cancelled
        });
        $rootScope.$apply();
        expect(cancelled).toBe(false);

        straatbeeldApi.getImageDataById('ABC'); // first request
        cancel.promise.then(() => {
            cancelled = true;
        });
        straatbeeldApi.getImageDataById('ABC'); // second request, first not yet completed
        $rootScope.$apply();
        expect(cancelled).toBe(true);
    });

    describe('calls the API factory with the correct endpoint for location', () => {
        beforeEach(() => {
            spyOn(api, 'getByUrl').and.callThrough();
        });

        it('with geolocation', () => {
            straatbeeldApi.getImageDataByLocation([52, 4]);

            expect(api.getByUrl).toHaveBeenCalledWith(
                'http://pano.amsterdam.nl/panorama/panoramas?near=4,52&srid=4326&newest_in_range=true&radius=250',
                undefined,
                jasmine.anything()
            );
        });

        it('with geolocation and history', () => {
            straatbeeldApi.getImageDataByLocation([52, 4], 2017);

            expect(api.getByUrl).toHaveBeenCalledWith(
                'http://pano.amsterdam.nl/panorama/panoramas' +
                '?near=4,52&srid=4326&timestamp_before=2017-12-31&timestamp_after=2017-01-01&radius=250',
                undefined,
                jasmine.anything()
            );
        });

        it('doesnt call without geolocation', () => {
            straatbeeldApi.getImageDataByLocation(null);
            expect(api.getByUrl).not.toHaveBeenCalled();
        });
    });

    it('stops calling the API factory when no straatbeeld is found', () => {
        spyOn(api, 'getByUrl').and.callFake(url => {
            const defer = $q.defer();
            defer.resolve({});
            return defer.promise;
        });

        let result;
        let failed = false;
        straatbeeldApi.getImageDataByLocation([52, 4]).then(
            data => result = data,
            () => failed = true
        );

        $rootScope.$apply();
        expect(failed).toBe(false); // No rejection
        expect(result).toBeNull();  // But return null value
    });

    it('cancels any outstanding call to the API factory when loading a new straatbeeld by loc', () => {
        spyOn(api, 'getByUrl').and.callThrough();
        let cancelled = false;

        straatbeeldApi.getImageDataByLocation([52, 4]);
        cancel.promise.then(() => {
            cancelled = true;
            fail(); // 1 outstanding request should not be cancelled
        });
        $rootScope.$apply();
        expect(cancelled).toBe(false);

        straatbeeldApi.getImageDataByLocation([52, 4]); // first request
        cancel.promise.then(() => {
            cancelled = true;
        });
        straatbeeldApi.getImageDataByLocation([52, 4]); // second request, first not yet completed
        $rootScope.$apply();
        expect(cancelled).toBe(true);
    });

    describe('the API will be mapped to the state structure', () => {
        let response;

        beforeEach(() => {
            spyOn(geojson, 'getCenter').and.callThrough();

            straatbeeldApi.getImageDataById('ABC').then(function (_response_) {
                response = _response_;
            });

            $rootScope.$apply();
        });

        it('converts date string to Javascript date format', () => {
            expect(response.date).toEqual(new Date('2016-05-19T13:04:15.341110Z'));
        });

        it('maps hotspot data to proper subset', () => {
            expect(response.hotspots).toEqual(
                [{
                    id: 'TMX7315120208-000054_pano_0002_000178',
                    heading: 127.37,
                    distance: 5.25,
                    year: 2017
                }]
            );
        });

        it('maps a geoJSON Point to a location in a custom formatted [lat, lng] Array notation', () => {
            expect(geojson.getCenter).toHaveBeenCalledWith({
                type: 'Point',
                coordinates: [
                    52.3747994036985,
                    4.91359770418102
                ]
            });

            expect(response.location).toEqual([52.3747994036985, 4.91359770418102]);
        });

        it('fetches the cubic image', () => {
            expect(response.image).toEqual({
                baseurl: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg',
                pattern: 'http://pano.amsterdam.nl/all/cubic/abf123/{a}/{b}/{c}.jpg',
                preview: 'http://pano.amsterdam.nl/all/cubic/abf123/base.jpg'
            });
        });
    });

    describe('the history selection', () => {
        beforeEach(() => {
            spyOn(api, 'getByUrl').and.callThrough();
        });

        it('will make \'getImageDataById\' use another endpoint', () => {
            straatbeeldApi.getImageDataById('ABC', 2020);

            expect(api.getByUrl).toHaveBeenCalledWith(
                'http://pano.amsterdam.nl/panorama/panoramas/ABC/adjacencies' +
                '?timestamp_before=2020-12-31&timestamp_after=2020-01-01&radius=250',
                undefined,
                jasmine.anything()
            );
        });

        it('will not change the endpoint when falsy', () => {
            straatbeeldApi.getImageDataByLocation([52, 4], 0);

            expect(api.getByUrl).toHaveBeenCalledWith(
                'http://pano.amsterdam.nl/panorama/panoramas?near=4,52&srid=4326&newest_in_range=true&radius=250',
                undefined,
                jasmine.anything()
            );

            api.getByUrl.calls.reset();

            straatbeeldApi.getImageDataById('ABC', 0);

            expect(api.getByUrl).toHaveBeenCalledWith(
                'http://pano.amsterdam.nl/panorama/panoramas/ABC/adjacencies?newest_in_range=true&radius=250',
                undefined,
                jasmine.anything()
            );
        });
    });
});
