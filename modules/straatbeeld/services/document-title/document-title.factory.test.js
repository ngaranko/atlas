describe('The dpStraatbeeldDocumentTitle factory', function () {
    let documentTitle;

    beforeEach(function () {
        angular.mock.module(
            'dpStraatbeeld',
            function ($provide) {
                $provide.value('coordinatesFilter', function (location) {
                    return location.join(', ') + ' (X, Y)';
                });
            }
        );

        angular.mock.inject(function (dpStraatbeeldDocumentTitle) {
            documentTitle = dpStraatbeeldDocumentTitle;
        });
    });

    it('returns the text \'Panorama op\' and the coordinates in both WGS84 and RD', function () {
        const mockedStraatbeeldState = {
            location: [52.123, 4.789]
        };
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Panorama op 52.123, 4.789 (X, Y)');

        mockedStraatbeeldState.location = [52.987, 4.321];
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Panorama op 52.987, 4.321 (X, Y)');
    });

    it('returns the text \'Panorama\' when no coordinates are (yet) available', function () {
        const mockedStraatbeeldState = {};
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Panorama');
    });

    it('returns the text \'Groot panorama\' when the panorama is in full screen', function () {
        const mockedStraatbeeldState = {isFullscreen: true};
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Groot panorama');
    });

    it('returns the text \'Panorama (Alleen 2017) op\' and the coordinates in both WGS84 and RD', function () {
        const mockedStraatbeeldState = {
            location: [52.123, 4.789],
            history: 2017
        };
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Panorama (Alleen 2017) op 52.123, 4.789 (X, Y)');

        mockedStraatbeeldState.location = [52.987, 4.321];
        expect(documentTitle.getTitle(mockedStraatbeeldState)).toBe('Panorama (Alleen 2017) op 52.987, 4.321 (X, Y)');
    });
});
