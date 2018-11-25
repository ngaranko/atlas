import { routing } from '../../../../src/app/routes';

(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpCatalogusThemes', {
            templateUrl: 'modules/page/components/catalogus-themes/catalogus-themes.html',
            controller: DpCatalogusThemes,
            controllerAs: 'vm'
        });

    DpCatalogusThemes.$inject = ['CATALOGUS_THEMES_CONFIG'];

    function DpCatalogusThemes (CATALOGUS_THEMES_CONFIG) {
        const vm = this;

        vm.themes = CATALOGUS_THEMES_CONFIG.map(theme => {
            const linkTo = {
                type: routing.datasets.type,
                meta: {
                    query: {
                        // eslint-disable-next-line angular/json-functions
                        filters: btoa(JSON.stringify({ groups: theme.slug }))
                    }
                }
            };
            return {
                ...theme,
                linkTo
            };
        });

        vm.themesPerColumn = Math.ceil(vm.themes.length / 2);
    }
})();
