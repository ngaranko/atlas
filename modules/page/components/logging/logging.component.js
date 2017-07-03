(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpLogging', {
            templateUrl: 'modules/page/components/logging/logging.html',
            controller: DpLoggingController,
            controllerAs: 'vm'
        });

    DpLoggingController.$inject = ['Raven'];

    function DpLoggingController (Raven) {
        const vm = this;
        const c = console;

        vm.catchException = () => {
            try {
                c.info('Try something safely');
                vm.test = vm.non.existent;
            } catch (e) {
                Raven.captureException(e);
                c.info('Exception caught and passed on to Raven');
            }
        };

        vm.causeException = () => {
            c.info('Try something unsafe');
            vm.test = vm.tryTo.catchMeIfYouCan;
        };

        vm.throwException = () => {
            c.info('Deliberately thowing an error without catching it');
            throw new Error('Deliberately thowing this error without catching it.');
        };

        vm.feedback = () => {
            try {
                c.info('Throw an Error');
                throw new Error('Something went wrong, hopefully the user sends some feedback.');
            } catch (e) {
                Raven.captureException(e);
                c.info('Exception caught and passed on to Raven');
                c.info('Show report dialog');
                Raven.showReportDialog();
            }
        };
    }
})();
