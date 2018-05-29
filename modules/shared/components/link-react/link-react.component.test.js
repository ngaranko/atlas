describe('The dp-link-react component', function () {
    let $compile,
        $rootScope,
        $timeout,
        $window,
        mockedPayload,
        mockedState;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            {
                $location: {
                    host: function () {
                        return 'localhost';
                    }
                },
                store: {
                    dispatch: angular.noop
                },
                applicationState: {
                    getStore: () => {
                        return {
                            getState: () => {
                                return mockedState;
                            }
                        };
                    }
                }
            });

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _$timeout_, _$window_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            $window = _$window_;
        });

        mockedPayload = {
            lalalala: true,
            numberOfLas: 4
        };

        $window.render = jasmine.createSpy();
        $window.React = jasmine.createSpyObj('React', ['createElement']);
    });

    function getComponent (className, hoverText, type, payload) {
        const element = document.createElement('dp-link-react');
        element.setAttribute('type', type);

        const scope = $rootScope.$new();

        if (angular.isDefined(payload)) {
            element.setAttribute('payload', 'payload');
            scope.payload = payload;
        }

        if (angular.isString(className)) {
            element.setAttribute('class-name', className);
        }

        if (angular.isString(hoverText)) {
            element.setAttribute('hover-text', hoverText);
        }

        element.innerText = 'Transcluded text';

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    fit('renders the react component', () => {
        getComponent(null, null, 'ACTION_WITH_LINK', mockedPayload);
        $timeout.flush();
        expect($window.render).toHaveBeenCalled();
        expect($window.React.createElement).toHaveBeenCalled();
    });
});
