(function () {
    'use strict';

    angular
        .module('dpMap')
        .component('dpEmbedButton', {
            transclude: true,
            templateUrl: 'modules/map/components/embed-button/embed-button.html',
            controller: DpEmbedButtonController,
            controllerAs: 'vm'
        });

    DpEmbedButtonController.$inject = [];

    function DpEmbedButtonController () {
        var vm = this;

        vm.click = function () {
            console.log('click embed button');
        };
    }
})();
