(function () {
    angular
        .module('dpShared')
        .component('dpApiError', {
            templateUrl: 'modules/shared/components/api-error/api-error.html',
            controller: DpApiErrorController,
            controllerAs: 'vm'
        });

    DpApiErrorController.$inject = ['$scope', 'httpStatus'];

    function DpApiErrorController ($scope, httpStatus) {
        const vm = this;

        // Simply expose the http status as well
        vm.httpStatus = httpStatus.getStatus();

        reset();

        $scope.$watch('vm.httpStatus', currentStatus => {
            reset();

            if (currentStatus.hasErrors) {
                if (currentStatus[httpStatus.NOT_FOUND_ERROR]) {
                    vm.showNotFoundError = true;
                } else if (currentStatus[httpStatus.LOGIN_ERROR]) {
                    vm.showLoginError = true;
                } else {
                    vm.showServerError = true;
                }
            }
        });

        function reset () {
            vm.showServerError = false;
            vm.showNotFoundError = false;
        }
    }
})();
