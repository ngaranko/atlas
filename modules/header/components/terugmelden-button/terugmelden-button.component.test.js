import { REPORT_PROBLEM_REQUEST } from '../../../../src/header/ducks/actions';

describe('The dp-terugmelden-button component', function () {
    var $compile,
        $rootScope,
        store;

    beforeEach(function () {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    dispatch: function () {}
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        spyOn(store, 'dispatch');
    });

    function getComponent (transcludeStr, className) {
        var component,
            element,
            scope;

        element = document.createElement('dp-terugmelden-button');

        if (angular.isString(transcludeStr)) {
            element.innerHTML = transcludeStr;
        }

        if (angular.isString(className)) {
            element.setAttribute('class-name', className);
        }

        scope = $rootScope.$new();
        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('sets a mailto URL', function () {
        var component = getComponent();

        expect(component.find('a').attr('href'))
            .toBe('mailto:terugmelding.basisinformatie@amsterdam.nl?subject=Terugmelding%20data.amsterdam.nl&body=' +
            'Terugmeldingen%20voor%20de%20pagina%3A%20http%3A%2F%2Flocalhost%3A9876%2Fcontext.html%0A%0ABeschrijf%20' +
            'zo%20volledig%20mogelijk%20van%20welk%20onjuist%20gegeven%20je%20een%20melding%20wilt%20maken%3A%0A-%20' +
            'Welk%20gegeven%20is%20kennelijk%20onjuist%20of%20ontbreekt%3F%0A-%20Weet%20je%20wat%20het%20wel%20zou%20' +
            'moeten%20zijn%3F%0A-%20Waarop%20is%20jouw%20constatering%20gebaseerd%3F%20Omschrijf%20de%20reden%20en%20' +
            'voeg%20indien%20mogelijk%20relevante%20documenten%20in%20de%20bijlage%20toe%20(bijvoorbeeld%3A%20een%20' +
            'bouwtekening%2C%20koopakte%2C%20et%20cetera).'
        );
    });

    it('has transclude enabled', function () {
        var htmlStr = '<p id="unit-test-selector">This will be transcluded!</p>';

        expect(getComponent(htmlStr).find('p[id="unit-test-selector"]').text()).toBe('This will be transcluded!');
    });

    it('can have a custom className', function () {
        const component = getComponent(null, 'my-special-class');
        expect(component.find('.qa-link').attr('class')).toContain('my-special-class');
    });

    it('has a default fallback class if no className is specified', function () {
        const component = getComponent();
        expect(component.find('.qa-link').attr('class')).toContain('o-btn o-btn--link');
    });

    it('dispatches an action for piwik on click', function () {
        const component = getComponent();
        component.find('.qa-link').click();
        expect(store.dispatch).toHaveBeenCalledWith({ type: REPORT_PROBLEM_REQUEST, meta: { tracking: true } });
    });
});
