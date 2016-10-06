describe('The earthmine factory', function () {
    var $httpBackend,
        earthmine,
        earthmineDataFormatter,
        mockedEarthmineResponse = {
            someVar: 'someValue',
            isFakeData: true
        },
        expectedResponse = {
            someVar: 'someValue',
            isFakeData: true,
            hasBeenFormatted: true
        };

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            {
                straatbeeldConfig: {
                    DATA_ENDPOINT: 'http://www.example.com/pano-pano-proxy/',
                    TILE_ENDPOINT: 'http://www.example.com/pano-tile-proxy/'
                },
                earthmineDataFormatter: {
                    formatPanoramaState: function (input) {
                        input.hasBeenFormatted = true;

                        return input;
                    }
                }
            }
        );

        angular.mock.inject(function (_$httpBackend_, _earthmine_, _earthmineDataFormatter_) {
            $httpBackend = _$httpBackend_;
            earthmine = _earthmine_;
            earthmineDataFormatter = _earthmineDataFormatter_;
        });

        $httpBackend.whenGET('http://www.example.com/pano-pano-proxy/?id=1').respond(mockedEarthmineResponse);
        $httpBackend.whenGET('http://www.example.com/pano-pano-proxy/?lat=52.12&lon=4.89')
            .respond(mockedEarthmineResponse);
    });

    describe('can get data from the API', function () {
        it('by panorama scene ID', function () {
            earthmine.getImageDataById(1).then(function (data) {
                expect(data).toEqual(expectedResponse);
            });

            $httpBackend.flush();
        });

        it('by coordinates', function () {
            earthmine.getImageDataByCoordinates(52.12, 4.89).then(function (data) {
                expect(data).toEqual(expectedResponse);
            });

            $httpBackend.flush();
        });

        it('formats the response', function () {
            spyOn(earthmineDataFormatter, 'formatPanoramaState');

            earthmine.getImageDataById(1);
            $httpBackend.flush();
            expect(earthmineDataFormatter.formatPanoramaState).toHaveBeenCalledTimes(1);
            expect(earthmineDataFormatter.formatPanoramaState).toHaveBeenCalledWith(mockedEarthmineResponse);

            earthmine.getImageDataByCoordinates(52.12, 4.89);
            $httpBackend.flush();
            expect(earthmineDataFormatter.formatPanoramaState).toHaveBeenCalledTimes(2);
            expect(earthmineDataFormatter.formatPanoramaState).toHaveBeenCalledWith(mockedEarthmineResponse);
        });
    });

    it('can generate an image source url based on a scene ID', function () {
        var url = earthmine.getImageSourceUrl(12345);

        expect(url).toBe('http://www.example.com/pano-tile-proxy/?id=12345&f={f}&z={z}&x={x}&y={y}');
    });
});
