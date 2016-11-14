(function () {
    angular
        .module('dpShared')
        .component('dpApiError', {
            templateUrl: 'modules/shared/components/api-error/api-error.html',
            controller: DpApiErrorController,
            controllerAs: 'vm'
        });

    DpApiErrorController.$inject = ['httpStatus'];

    function DpApiErrorController (httpStatus) {
        let vm = this;

        // We need the error type keys on the httpStatus object
        vm.errorKeys = httpStatus;

        // Simply expose the http status as well
        vm.httpStatus = httpStatus.getStatus();
    }
})();
