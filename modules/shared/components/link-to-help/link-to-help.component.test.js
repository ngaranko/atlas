describe('The link to help component', function () {
    let $compile,
        $rootScope,
        mockedReducer,
        mockedState,
        mockedStateUrlConverter,
        mockedTargetPath,
        store;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                store: {
                    dispatch: angular.noop
                },
                applicationState: {
                    getReducer: () => {
                        return mockedReducer;
                    },
                    getStateUrlConverter: () => {
                        return mockedStateUrlConverter;
                    },
                    getStore: () => {
                        return {
                            getState: () => {
                                return mockedState;
                            }
                        };
                    }
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
        });

        mockedReducer = jasmine.createSpy('reducer');

        mockedStateUrlConverter = {
            state2params: angular.noop,
            params2state: angular.noop,
            state2url: () => {
                return mockedTargetPath;
            }
        };

        mockedTargetPath = '#this=something-else';

        spyOn(store, 'dispatch');
    });

    function getComponent (item, type, label) {
        const element = document.createElement('dp-link-to-help');

        if (type) {
            element.setAttribute('type', type);
        }
        if (item) {
            element.setAttribute('item', item);
        }

        const scope = $rootScope.$new();
        if (type) {
            scope.type = type;
        }
        if (item) {
            scope.item = item;
        }

        if (label) {
            element.innerText = label;
        }

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('has default label', function () {
        const component = getComponent();
        expect(component.find('.qa-link-to-help-button').text()).toBe('Help > Bediening > Inloggen');
    });

    it('transcludes label', function () {
        const component = getComponent('infoitem4', 'info', 'Some label');
        expect(component.find('.qa-link-to-help-button').text()).toBe('Some label');
    });

    it('clicking the button will trigger a call to store.dispatch with default type and no item', function () {
        store.dispatch.calls.reset();
        const component = getComponent();

        component.find('.qa-link-to-help-button').click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: { id: 'SHOW_PAGE' },
            payload: { name: 'content-overzicht', type: 'snelwegwijs' }
        });
    });

    it('clicking the button will trigger a call to store.dispatch with type info and infoitem4 item', function () {
        store.dispatch.calls.reset();
        const component = getComponent('infoitem4', 'info');

        component.find('.qa-link-to-help-button').click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: { id: 'SHOW_PAGE' },
            payload: { name: 'content-overzicht', type: 'info', item: 'infoitem4' }
        });
    });
});
