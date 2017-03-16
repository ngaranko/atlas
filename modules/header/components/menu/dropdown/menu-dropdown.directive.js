(function () {
    'use strict';

    angular
        .module('dpHeader')
        .directive('dpMenuDropdown', dpMenuDropdownDirective);

    function dpMenuDropdownDirective () {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                type: '@',
                align: '@',
                hasPrintButton: '<'
            },
            transclude: true,
            templateUrl: 'modules/header/components/menu/dropdown/menu-dropdown.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var everywhere = angular.element(window.document);

            scope.isVisible = false;
            scope.align = scope.align === 'left' ? 'left' : 'right';

            scope.toggleDropdown = function () {
                scope.isVisible = !scope.isVisible;
            };

            everywhere.bind('click', function (event) {
                const button = element.find('button'),
                    span = button.find('span'),
                    nav = element.find('nav'),
                    isButtonClick = event.target === button[0] ||
                        event.target === span[0] ||
                        event.target === nav[0];

                if (!isButtonClick) {
                    scope.isVisible = false;
                }

                scope.$apply();
            });
        }
    }
})();
