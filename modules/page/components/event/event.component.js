(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpEvent', {
            bindings: {
                date: '<'
            },
            transclude: true,
            templateUrl: 'modules/page/components/event/event.html',
            controller: DpEventController,
            controllerAs: 'vm'
        });

    DpEventController.$inject = ['dateFilter'];

    function DpEventController (dateFilter) {
        let vm = this;

        vm.day = vm.date.getDate();

        vm.month = dateFilter(vm.date, 'MMM').substr(0, 3);
    }
})();
