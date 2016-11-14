beforeEach(function () {
    angular.mock.module(
        'dpShared',
        function ($provide, $compileProvider, $injector) {
            /*$provide.factory('dpLinkDirective', function () {
                return dpLinkDirective({
                    subscribe: angular.noop,
                    getState: angular.noop
                }, [], {
                    getReducer: angular.noop,
                    getStateToUrl: angular.noop
                }, angular.noop);
            });*/
            $compileProvider.directive('dpLink', dpLinkDirective);
            /*$provide.factory('dpLinkDirective', function () {
                return $injector.get('dpLinkDirective');
            });*/

            function dpLinkDirective (store, ACTIONS, applicationState, debounce) {
                store = {
                    subscribe: function () { return angular.noop; },
                    getState: angular.noop,
                    dispatch: store.dispatch
                };
                ACTIONS = [];
                applicationState = {
                    getReducer: function () { return angular.noop; },
                    getStateToUrl: function () {
                        return {
                            create: angular.noop
                        };
                    }
                };
                debounce = function () { return angular.noop; };

                var reducer = applicationState.getReducer(),
                    stateToUrl = applicationState.getStateToUrl();

                return {
                    template: '<a ng-href="{{url}}" ng-click="click()" class="{{className}}" title="{{hoverText}}"><ng-transclude>' +
                        '</ng-transclude></a>',
                    transclude: true,
                    link: linkFn,
                    scope: {
                        className: '@',
                        hoverText: '@',
                        type: '@',
                        payload: '='
                    }
                };

                function linkFn (scope, element) {
                    var unsubscribe = angular.noop;
                    var destroyed = false;

                    if (store && store.subscribe && debounce) {
                        unsubscribe = store.subscribe(debounce(300, update));
                    }

                    scope.className = scope.className || 'o-btn o-btn--link';
                    scope.click = clickHandler;

                    // We don't need to keep updating the url after the element has
                    // been destroyed
                    element.on('$destroy', function () {
                        destroyed = true;
                        unsubscribe();
                        scope.$destroy();
                    });

                    update();

                    function update () {
                        if (!destroyed) {
                            var oldState = store.getState(),
                                action = angular.isDefined(scope.payload) ? {
                                    type: ACTIONS[scope.type],
                                    payload: scope.payload
                                } : {
                                    type: ACTIONS[scope.type]
                                },
                                newState = reducer(oldState, action),
                                url = stateToUrl.create(newState);

                            scope.url = url;
                        }
                    }

                    function clickHandler () {
                        var action = angular.isDefined(scope.payload) ? {
                            type: scope.type,
                            payload: scope.payload
                        } : {
                            type: scope.type
                        };

                        store.dispatch(action);
                    }
                }
            }
        }
    );
});
