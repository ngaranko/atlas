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

    function getComponent () {
        const element = document.createElement('dp-link-to-help');

        const scope = $rootScope.$new();

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('clicking the button will trigger a call to store.dispatch', function () {
        store.dispatch.calls.reset();
        const component = getComponent();

        component.find('.qa-link-to-help-button').click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: { id: 'SHOW_PAGE' },
            payload: { name: 'content-overzicht', type: 'snelwegwijs', item: 'item9' }
        });
    });
});
