(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .component('dpStraatbeeldMetadata', {
            bindings: {
                date: '<',
                location: '<',
                heading: '<'
            },
            templateUrl: 'modules/straatbeeld/components/metadata/metadata.html',
            controller: DpStraatbeeldMetadataController,
            controllerAs: 'vm'
        });

    DpStraatbeeldMetadataController.$inject = ['$scope'];

    function DpStraatbeeldMetadataController ($scope) {
        const vm = this;

        vm.showMetaInfo = () => angular.isDate(vm.date) && angular.isArray(vm.location);
    }
})();
