describe('The leafletDrawTranslations factory', function () {
    let L,
        leafletDrawTranslations;

    beforeEach(function () {
        angular.mock.module(
            'dpMap'
        );

        angular.mock.inject((_L_, _leafletDrawTranslations_) => {
            L = _L_;
            leafletDrawTranslations = _leafletDrawTranslations_;
        });
    });

    it('sets all L.drawLocal texts to ampty string', function () {
        expect(L.drawLocal.draw.toolbar.actions.title).not.toBe('');
        expect(L.drawLocal.draw.toolbar.actions.text).not.toBe('');

        leafletDrawTranslations.initialize();

        // Test any arbitrary texts to be set to ''
        expect(L.drawLocal.draw.toolbar.actions.title).toBe('');
        expect(L.drawLocal.draw.toolbar.actions.text).toBe('');
    });
});
