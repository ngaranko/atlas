import {
    ERROR_TYPES,
    resetGlobalError
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

        vm.showGeneralError = false;
        vm.showNotFoundError = false;
        vm.showLoginError = false;

        vm.hide = () => {
            store.dispatch(resetGlobalError());
        };

        const checkErrors = (errorState) => {
            const { hasErrors, types } = errorState;
            if (hasErrors) {
                if (types.hasOwnProperty(ERROR_TYPES.NOT_FOUND_ERROR)) {
                    vm.showNotFoundError = true;
                } else if (types.hasOwnProperty(ERROR_TYPES.LOGIN_ERROR)) {
                    vm.showLoginError = true;
                } else {
                    vm.showGeneralError = true;
                }
            }
        };

        checkErrors(store.getState().error);

        $scope.$watch('vm.user.error', (error) => {
            if (error) {
                vm.showLoginError = true;
            }
        });

        store.subscribe(() => {
            const { error } = store.getState();
            if (error.hasErrors) {
                $timeout(() => {
                    checkErrors(error);
                });
            }
        });
    }
})();
