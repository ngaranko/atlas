fdescribe('Straatbeeld API Factory', function () {

    var straatbeeldApi,
        $http,
        $httpBackend,
        geojson;


    beforeEach(function () {
        angular.mock.module('dpStraatbeeld', {
            straatbeeldConfig: {
                PANORAMA_ENDPOINT: 'http://example.com/example/'
            },
            sharedConfig: {
                RADIUS: 100
            },
            geojson: {
                getCenter: function () {
                    return [52.3747994036985, 4.91359770418102];
                }
            }
        });

        angular.mock.inject(function (_straatbeeldApi_, _$http_, _$httpBackend_, _geojson_) {
            straatbeeldApi = _straatbeeldApi_;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            geojson = _geojson_;
        });

    });

    it('Calls HTTP get with custom URL and parameters', function () {
        spyOn($http, 'get').and.callThrough();

        straatbeeldApi.getImageDataById('ABC');

        expect($http.get).toHaveBeenCalledWith('http://example.com/example/ABC/', {
            params: { radius: 100 }
        });
    });

    describe('restructures API response', function () {

        var response;

        beforeEach(function () {
            $httpBackend.whenGET('http://example.com/example/ABC/?radius=100').respond({
                images: {
                    equirectangular: 'http://example.com/example/plaatje.png'
                },
                geometrie: {
                    type: 'Point',
                    coordinates: [
                        4.91359770418102,
                        52.3747994036985,
                        46.9912552172318
                    ]
                },
                adjacent: [{
                    pano_id: 'TMX7315120208-000054_pano_0002_000177',
                    heading: 116.48,
                    distance: 10.14
                },
                    {
                        pano_id: 'TMX7315120208-000054_pano_0002_000178',
                        heading: 127.37,
                        distance: 5.25
                    }],
                timestamp: '2016-05-19T13:04:15.341110Z'
            });

            spyOn(geojson, 'getCenter').and.callThrough();

            straatbeeldApi.getImageDataById('ABC').then(function (_response_) {
                response = _response_;
            });

            $httpBackend.flush();
        });

        it('converts date string to Javascript date format', function () {

            expect(response.date).toEqual(new Date('2016-05-19T13:04:15.341110Z'));


        });
        it('maps hotspot data to proper subset', function () {
            expect(response.hotspots).toEqual([{
                panoId: 'TMX7315120208-000054_pano_0002_000177',
                heading: 116.48,
                distance: 10.14
            }, {
                panoId: 'TMX7315120208-000054_pano_0002_000178',
                heading: 127.37,
                distance: 5.25
            }]);

        });
        it('maps geoJson point to lat/lon notation', function () {

            expect(geojson.getCenter).toHaveBeenCalledWith({
                type: 'Point',
                coordinates: [
                    4.91359770418102,
                    52.3747994036985,
                    46.9912552172318
                ]
            });

            expect(response.location).toEqual([52.3747994036985, 4.91359770418102]);
        });

        it('fetches equirectangular image', function () {
            expect(response.image).toBe('http://example.com/example/plaatje.png');
        });

    });


});