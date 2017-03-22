(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpEventWhenWhere', {
            bindings: {
                title: '<',
                time: '<',
                location: '<'
            },
            templateUrl: 'modules/page/components/event/event-when-where/event-when-where.html',
            controllerAs: 'vm'
        });
})();
