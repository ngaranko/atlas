(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpMessage', {
            transclude: true,
            templateUrl: 'modules/shared/components/message/message.html'
        });
})();
