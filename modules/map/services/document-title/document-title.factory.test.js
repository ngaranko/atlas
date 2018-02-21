/* eslint-disable angular/window-service */
window.reduxStore = {
    getState: (() => {
        return {map: { zoom: 0 }};
    })
};

describe('The dpMapDocumentTitle factory', function () {
    var documentTitle,
        activeOverlays,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('dpMap', {
            store: angular.noop
        });

        angular.mock.inject(function (dpMapDocumentTitle, _$rootScope_, _activeOverlays_) {
            documentTitle = dpMapDocumentTitle;
            $rootScope = _$rootScope_;
            activeOverlays = _activeOverlays_;
        });
    });

    afterEach(() => {
        $rootScope.$apply();
    });

    it('returns a default title with promise', function () {
        const promise = documentTitle.getTitle();

        $rootScope.$apply();
        promise.then(value => {
            expect(value).toBe('Grote kaart');
        });
    });

    it('adds selected map layers in title with promise', function () {
        spyOn(activeOverlays, 'getOverlaysLabels').and.returnValue('Meetbouten, Monumenten');

        const promise = documentTitle.getTitle();

        $rootScope.$apply();
        promise.then(value => {
            expect(value).toBe('Meetbouten, Monumenten op Grote kaart');
        });
    });
});
