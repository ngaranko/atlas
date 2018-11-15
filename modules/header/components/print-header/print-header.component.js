import { hidePrintMode } from '../../../../src/shared/ducks/ui/ui';

(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpPrintHeader', {
            templateUrl: 'modules/header/components/print-header/print-header.html',
            controllerAs: 'vm',
            controller: function () {
                const vm = this;

                vm.hidePrintAction = hidePrintMode();
            }
        });
})();
