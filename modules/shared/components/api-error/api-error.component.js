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

    DpApiErrorController.$inject = ['$scope', '$timeout', 'httpStatus', 'store'];

    function DpApiErrorController ($scope, $timeout, httpStatus, store) {
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

        // TODO: get this logic away from view
        $scope.$watch('vm.user.error', (error) => {
            if (error) {
                httpStatus.registerError(ERROR_TYPES.LOGIN_ERROR);
            }
        });

        function reset () {
            vm.showServerError = false;
            vm.showNotFoundError = false;
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
