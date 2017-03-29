(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpMenu', {
            bindings: {
                hasPrintButton: '<',
                size: '='
            },
            templateUrl: 'modules/header/components/menu/menu.html',
            controller: DpMenuController,
            controllerAs: 'vm'
        });

    DpMenuController.$inject = ['$scope', 'authenticator', 'user'];

    function DpMenuController ($scope, authenticator, user) {
        const vm = this;

        vm.login = authenticator.login;

        vm.isAuthenticated = () => user.getUserType() === user.USER_TYPE.AUTHENTICATED;

        $scope.$watchGroup([getUsername, getUserIsBevoegd], setUserMenuLabel);

        function getUsername () {
            return user.getName().replace(/@.*$/, '');
        }

        function getUserIsBevoegd () {
            return user.getAuthorizationLevel() === user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS;
        }

        function setUserMenuLabel ([username, isBevoegd]) {
            const maxLength = isBevoegd ? 3 : 8,
                name = username.substr(0, maxLength),
                ellipsis = name !== username ? '…' : '',
                bevoegd = isBevoegd ? ' (bevoegd)' : '';

            vm.userMenuLabel = name + ellipsis + bevoegd;
        }
    }
})();
