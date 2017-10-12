(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpMenu', {
            bindings: {
                hasPrintButton: '<',
                hasEmbedButton: '<',
                size: '=',
                user: '<'
            },
            templateUrl: 'modules/header/components/menu/menu.html',
            controller: DpMenuController,
            controllerAs: 'vm'
        });

    DpMenuController.$inject = ['$scope', 'authenticator'];

    function DpMenuController ($scope, authenticator) {
        const vm = this;

        vm.login = authenticator.login;

        $scope.$watch('vm.user.name', setUserMenuLabel);

        function setUserMenuLabel (username) {
            const maxLength = 9;
            const name = username.replace(/@.*$/, '');
            const truncatedName = name.length > maxLength + 1
                ? name.substr(0, maxLength) : name;
            const ellipsis = truncatedName !== name ? '...' : '';

            vm.userMenuLabel = truncatedName + ellipsis;
        }
    }
})();
