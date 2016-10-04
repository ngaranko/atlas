(function () {
    'use strict';

    angular
        .module('dpDetail')
        .directive('atlasStelselpediaMeta', atlasStelselpediaMetaDirective);

    function atlasStelselpediaMetaDirective () {
        return {
            restrict: 'E',
            scope: {
                definition: '@',
                apiData: '='
            },
            templateUrl: 'modules/detail/components/stelselpedia/meta/stelselpedia-meta.html',
            transclude: true,
            controller: AtlasStelselpediaMetaController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    AtlasStelselpediaMetaController.$inject = ['STELSELPEDIA'];

    function AtlasStelselpediaMetaController (STELSELPEDIA) {
        var vm = this;

        vm.metaFields = [];

        STELSELPEDIA.DEFINITIONS[vm.definition].meta.forEach(function (field) {
            vm.metaFields.push({
                label: STELSELPEDIA.META[field].label,
                value: vm.apiData.results[field],
                type: STELSELPEDIA.META[field].type
            });
        });
    }
})();
