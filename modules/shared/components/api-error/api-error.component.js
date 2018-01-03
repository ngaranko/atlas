import {
    ERROR_TYPES
} from '../../../../src/shared/ducks/error-message.js';

(function () {
    angular
        .module('dpShared')
        .component('dpApiError', {
            bindings: {
                user: '<'
            },
            templateUrl: 'modules/shared/components/api-error/api-error.html',
            controller: DpApiErrorController,
            controllerAs: 'vm'
        });

    DpApiErrorController.$inject = ['$scope', '$timeout', 'store'];

    function DpApiErrorController ($scope, $timeout, store) {
        const vm = this;

        reset();

        $scope.$watch('vm.hasErrors', (hasErrors) => {
            reset();

            if (hasErrors) {
                const { error } = store.getState();
                if (error.types.hasOwnProperty(ERROR_TYPES.NOT_FOUND_ERROR)) {
                    vm.showNotFoundError = true;
                } else if (error.types.hasOwnProperty(ERROR_TYPES.LOGIN_ERROR)) {
                    vm.showLoginError = true;
                } else {
                    vm.showServerError = true;
                }
            }
        });

        $scope.$watch('vm.user.error', (error) => {
            reset();

            if (error) {
                vm.showLoginError = true;
            }
        });

        function reset () {
            vm.showServerError = false;
            vm.showNotFoundError = false;
            vm.showLoginError = false;
        }

        store.subscribe(() => {
            $timeout(() => {
                const { error } = store.getState();
                if (error.hasErrors) {
                    vm.hasErrors = true;
                }
            });
        });
    }
})();
