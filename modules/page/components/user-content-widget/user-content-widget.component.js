import getContents from '../../../../src/shared/services/google-sheet/google-sheet';
import { routing } from '../../../../src/app/routes';
import { NAVIGATE } from '../../../../src/shared/ducks/content/constants';

(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpUserContentWidget', {
            bindings: {
                type: '@',
                limitTo: '<'
            },
            templateUrl: 'modules/page/components/user-content-widget/user-content-widget.html',
            controller: DpUserContentWidgetController,
            controllerAs: 'vm'
        });

    DpUserContentWidgetController.$inject = ['$scope'];

    function DpUserContentWidgetController ($scope) {
        const vm = this;

        vm.actionType = NAVIGATE;
        this.$onInit = function () {
            vm.routing = routing;

            vm.feed = null;
            vm.entries = [];

            getContents (vm.type)
                .then(contents => {
                    vm.feed = contents.feed;
                    vm.entries = contents.entries;
                    $scope.$digest();
                });
        };
    }
})();
