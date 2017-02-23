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

        vm.themes = angular.copy(CATALOGUS_THEMES_CONFIG);
        vm.themeColumns = [];

        const itemsInLeftColumn = Math.ceil(vm.themes.length / 2);

        vm.themeColumns.push(vm.themes.splice(0, itemsInLeftColumn));
        vm.themeColumns.push(vm.themes);
    }
})();
