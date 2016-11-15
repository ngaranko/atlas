beforeEach(function () {
    console.log('pre mock');
    angular.mock.module(
        'dpShared',
        function ($compileProvider) {
            console.log('mock');
            $compileProvider.directive('dpLink', dpLinkDirective);

            function dpLinkDirective (store) {
                return {
                    template: '<button ng-click="click()" class="{{className}}" title="{{hoverText}}">' +
                        '<ng-transclude></ng-transclude></button>',
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
                    scope.className = scope.className || 'o-btn o-btn--link';
                    scope.click = clickHandler;

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
