import { NAVIGATE_HOME_REQUEST } from '../../../../src/header/ducks/actions';
import { routing } from '../../../../src/app/routes';

describe('The dp-logo component', () => {
    let $compile,
        $rootScope,
        store;

    beforeEach(() => {
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

    function getComponent (size) {
        var component,
            element,
            scope;

        element = document.createElement('dp-logo');
        element.setAttribute('size', 'size');

        scope = $rootScope.$new();
        scope.size = size;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    describe('the short version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('short');
        });

        it('has the short modifier on the root element', () => {
            expect(component.find('.qa-logo')[0].getAttribute('class')).toContain('c-logo--short');
            expect(component.find('.qa-logo')[0].getAttribute('class')).not.toContain('c-logo--tall');
        });

        it('shows the short logo image', () => {
            expect(component.find('.qa-logo__image')[0].getAttribute('src')).toContain('logo-short');
        });

        it('dispatches an action for piwik and directs to home on click', () => {
            component.find('.c-logo__link').click();
            expect(store.dispatch).toHaveBeenCalledWith({ type: routing.home.type });
            expect(store.dispatch).toHaveBeenCalledWith({ type: NAVIGATE_HOME_REQUEST, meta: { tracking: true } });
        });
    });

    describe('the tall version', () => {
        let component;

        beforeEach(() => {
            component = getComponent('tall');
        });

        it('has the tall modifier on the root element', () => {
            expect(component.find('.qa-logo')[0].getAttribute('class')).not.toContain('c-logo--short');
            expect(component.find('.qa-logo')[0].getAttribute('class')).toContain('c-logo--tall');
        });

        it('does not use grid layout', () => {
            expect(component.find('.qa-logo__image-col')[0].getAttribute('class')).not.toContain('u-col-sm--4');
            expect(component.find('.qa-logo__title-col')[0].getAttribute('class')).not.toContain('u-col-sm--8');
        });

        it('shows the tall logo image', () => {
            expect(component.find('.qa-logo__image')[0].getAttribute('src')).toContain('logo-tall');
        });
    });
});
