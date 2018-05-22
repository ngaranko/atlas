import ACTIONS from '../../../../src/shared/actions';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLink', {
            templateUrl: 'modules/shared/components/link/link.html',
            transclude: true,
            bindings: {
                className: '@',
                inline: '@',
                hoverText: '@',
                type: '@',
                payload: '<'
            },
            controller: DpLinkController,
            controllerAs: 'vm'
        });

    DpLinkController.$inject = ['$scope', '$window', '$timeout'];

    function DpLinkController($scope, $window, $timeout) {
        const vm = this;
        const React = $window.React;
        const render = $window.render;
        const routeLinkWrapper = $window.RouteLinkWrapper;
console.log('router: ' + routeLinkWrapper);
        const BUTTON = 'button',
            LINK = 'a';

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.inline = vm.inline || false;
        vm.id = `id-react-route-link-${+Date.now()}`;
        console.log(vm.id);
        $scope.$watch('vm.payload', function () {
            vm.tagName = getTagName(vm.type, vm.payload);
            setRouteLinkComponent();
        });

        function getTagName(type, payload) {
            if (ACTIONS[type] && ACTIONS[type].isButton) {
                return BUTTON;
            } else {
                return LINK;
            }
        }

        function setRouteLinkComponent() {
            $timeout(() => {
                console.log(vm.id);
                const routeLinkContainer = $window.document.querySelector(`#${vm.id}`);
                if (routeLinkContainer) {
                    const props = {
                        className: vm.className,
                        inline: vm.inline,
                        hoverText: vm.hoverText,
                        type: vm.type,
                        payload: vm.payload
                    };
                    render(React.createElement(routeLinkWrapper, props), routeLinkContainer);
                }
            });
        }
    }
})();
