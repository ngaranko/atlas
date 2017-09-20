describe('The link-to-page component', function () {
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
        const element = document.createElement('dp-link-to-page');

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
        expect(component.find('.qa-link-to-page-button').text()).toBe('Help > Bediening > Inloggen');
    });

    it('transcludes label', function () {
        const component = getComponent('infoitem4', 'info', 'Some label');
        expect(component.find('.qa-link-to-page-button').text()).toBe('Some label');
    });
});
