import React from 'react';
import { render } from 'react-dom';

import HelloWorld from '../../../../src/components/hello-world/HelloWorld.jsx';

(function () {
    'use strict';

    angular
        .module('dpHeader')
        .component('dpSiteHeader', {
            bindings: {
                query: '@',
                searchAction: '<',
                hasPrintButton: '<',
                hasEmbedButton: '<',
                size: '='
            },
            templateUrl: 'modules/header/components/site-header/site-header.html',
            controller: DpSiteHeaderController,
            controllerAs: 'vm'
        });

    DpSiteHeaderController.$inject = ['$scope', 'HEADER'];

    function DpSiteHeaderController ($scope, HEADER) {
        const vm = this;

        $scope.$watch('vm.size', updateSize);

        function updateSize (size) {
            vm.menuSize = vm.size === HEADER.SIZE.TALL ? HEADER.SIZE.SHORT : HEADER.SIZE.TALL;
            vm.isTall = vm.size === HEADER.SIZE.TALL;
            vm.isShort = vm.size === HEADER.SIZE.SHORT;
        }

        render(React.createElement(HelloWorld, null), document.getElementById('react-wrapper'));
    }
})();
