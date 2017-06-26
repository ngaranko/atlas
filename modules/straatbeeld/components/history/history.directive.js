(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .directive('dpStraatbeeldHistory', DpStraatbeeldHistoryDirective);

    function DpStraatbeeldHistoryDirective () {
        return {
            restrict: 'E',
            scope: {
                location: '<',
                heading: '<'
            },
            templateUrl: 'modules/straatbeeld/components/history/history.html',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            const firstYear = 2016;
            const currentYear = new Date().getFullYear();
            const total = currentYear - firstYear + 1;
            const everywhere = angular.element(window.document);

            scope.options = Array(total)
                .fill(0)
                .map((value, index) => {
                    const year = currentYear - index;
                    return {
                        year: year,
                        label: 'Alleen ' + year
                    };
                });

            scope.selectedOption = {
                year: 0,
                label: 'Meest recent'
            };

            scope.options.unshift(scope.selectedOption);

            scope.toggleMenu = () => scope.menuActive = !scope.menuActive;
            scope.setSelectedOption = (option) => scope.selectedOption = option;

            scope.$watch('location', updateLocation, true);

            everywhere.bind('click', (event) => {
                const container = element.find('div').eq(0);
                const button = container.find('div');
                const menu = container.find('ul');
                const devider = menu.find('li').eq(total + 1);
                const external = menu.find('li').eq(total + 2);
                const isButtonClick = [button, menu, devider, external]
                    .reduce((is, el) => is || event.target === el[0], false);

                if (!isButtonClick) {
                    scope.menuActive = false;
                }

                scope.$apply();
            });

            function updateLocation () {
                if (angular.isArray(scope.location)) {
                    const lat = scope.location[0];
                    const lon = scope.location[1];
                    const path = 'http://maps.google.com/maps?q=&layer=c&';
                    const parameters = `cbll=${lat},${lon}&cbp=11,${scope.heading},0,0,0`;

                    scope.streetviewUrl = `${path}${parameters}`;
                }
            }
        }
    }
})();
