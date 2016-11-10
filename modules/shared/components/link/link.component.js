(function () {
    'use strict';

    angular
        .module('dpShared')
        .directive('dpLink', DpLinkDirective);

    DpLinkDirective.$inject = ['store', 'ACTIONS', 'reducer', 'stateToUrl', 'debounce'];

    function DpLinkDirective (store, ACTIONS, reducer, stateToUrl, debounce) {
        return {
            templateUrl: 'modules/shared/components/link/link.html',
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
            const unsubscribe = store.subscribe(debounce(300, update));
            let destroyed = false;

            scope.className = scope.className || 'o-btn o-btn--link';

            // We don't need to keep updating the url after the element has
            // been destroyed
            element.on('$destroy', () => {
                destroyed = true;
                unsubscribe();
                scope.$destroy();
            });

            update();

            function update () {
                if (!destroyed) {
                    const oldState = store.getState(),
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
        }
    }
})();
