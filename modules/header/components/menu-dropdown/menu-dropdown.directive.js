(function () {
    'use strict';

    angular
        .module('dpHeader')
        .directive('dpMenuDropdown', dpMenuDropdownDirective);

    dpMenuDropdownDirective.$inject = ['authenticator'];

    function dpMenuDropdownDirective (authenticator) {
        return {
            restrict: 'E',
            scope: {
                isToolbar: '=',
                showAuthMenu: '@',
                hasPrintButton: '<'
            },
            transclude: true,
            templateUrl: 'modules/header/components/menu-dropdown/menu-dropdown.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var everywhere = angular.element(window.document);

            scope.isVisible = false;

            scope.toggleDropdown = function () {
                scope.isVisible = !scope.isVisible;
            };

            scope.logout = authenticator.logout;

            everywhere.bind('click', function (event) {
                const button = element.find('button');
                const span = button.find('span');
                const isButtonClick = event.target === button[0] ||
                    event.target === span[0];

                if (!isButtonClick) {
                    scope.isVisible = false;
                }

                scope.$apply();
            });
        }
    }
})();
