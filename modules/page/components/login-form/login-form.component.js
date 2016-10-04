(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('atlasLoginForm', {
            templateUrl: 'modules/page/components/login-form/login-form.html',
            controller: AtlasLoginFormController,
            controllerAs: 'vm'
        });

    AtlasLoginFormController.$inject = ['$window', 'user'];

    function AtlasLoginFormController ($window, user) {
        var vm = this;

        vm.errorMessage = null;

        vm.login = function (event) {
            event.preventDefault();

            vm.errorMessage = null;

            user
                .login(vm.username, vm.password)
                .then(function () {
                    $window.history.back();
                })
                .catch(function (errorMessage) {
                    vm.errorMessage = errorMessage;
                });
        };
    }
})();
