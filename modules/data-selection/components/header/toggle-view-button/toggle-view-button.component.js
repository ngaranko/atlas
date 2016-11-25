(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .component('dpToggleViewButton', {
            bindings: {
                view: '@'
            },
            tempalteUrl: 'modules/data-selection/components/header/toggle-view-button/toggle-view-button.html',
            controller: DpToggleViewButtonController,
            controllerAs: 'vm'
        });

    function DpToggleViewButtonController () {
        let vm = this;



    }
})();
