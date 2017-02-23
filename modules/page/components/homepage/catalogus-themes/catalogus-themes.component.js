(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpCatalogusThemes', {
            templateUrl: 'modules/page/components/homepage/catalogus-themes/catalogus-themes.html',
            controller: DpCatalogusThemes,
            controllerAs: 'vm'
        });

    DpCatalogusThemes.$inject = ['CATALOGUS_THEMES_CONFIG'];

    function DpCatalogusThemes (CATALOGUS_THEMES_CONFIG) {
        let vm = this;

        vm.themes = CATALOGUS_THEMES_CONFIG;
    }
})();
