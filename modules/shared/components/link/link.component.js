(function () {
    'use strict';

    angular
        .module('dpShared')
        .directive('dpLink', DpLinkDirective);

    DpLinkDirective.$inject = ['store', 'ACTIONS', 'applicationState', 'debounce'];

    function DpLinkDirective (store, ACTIONS, applicationState, debounce) {
        const reducer = applicationState.getReducer(),
            stateToUrl = applicationState.getStateToUrl();

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
            let debounced = debounce(300, update),
                unsubscribe = store.subscribe(debounced);

            scope.className = scope.className || 'o-btn o-btn--link';

            // We don't need to keep updating the url after the element has
            // been destroyed
            element.on('$destroy', () => {
                unsubscribe();
                debounced.cancel();
            });

            update();

            function update () {
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
})();
