(() => {
    'use strict';

    angular
        .module('dpShared')
        .component('dpDcatdButton', {
            templateUrl: 'modules/shared/components/dcatd-button/dcatd-button.html',
            transclude: true,
            bindings: {
                id: '@',
                type: '@'  // wijzigen or toevoegen
            },
            controller: DpDcatdButtonController,
            controllerAs: 'vm'
        });

    DpDcatdButtonController.$inject = ['$scope', '$window'];

    function DpDcatdButtonController ($scope, $window) {
        const vm = this;

        function onClick () {
            sessionStorage.setItem('DCATD_DETAIL_REDIRECT_URL', document.location.href);
            $window.location.assign(`/dcatd_admin#/datasets/${vm.id}`);
        }

        vm.onClick = onClick;
    }
})();
