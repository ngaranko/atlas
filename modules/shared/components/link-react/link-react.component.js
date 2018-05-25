import ACTIONS from '../../../../src/shared/actions';

(function () {
    'use strict';

    angular
        .module('dpShared')
        .component('dpLinkReact', {
            template: `<div class='route-link' >
                         <ng-transclude></ng-transclude>
                       </div>`,
            transclude: true,
            bindings: {
                className: '@',
                inline: '@',
                hoverText: '@',
                type: '@',
                payload: '<'
            },
            controller: DpLinkReactController,
            controllerAs: 'vm'
        });

    DpLinkReactController.$inject = ['$scope', '$window', '$timeout', '$element'];

    function DpLinkReactController ($scope, $window, $timeout, $element) {
        const vm = this;
        const React = $window.React;
        const render = $window.render;
        const routeLinkWrapper = $window.RouteLinkWrapper;
        const BUTTON = 'button',
            LINK = 'a';

        vm.className = vm.className || 'o-btn o-btn--link';
        vm.inline = vm.inline || false;
        $scope.$watch('vm.payload', function () {
            vm.tagName = getTagName(vm.type, vm.payload);
        });

        function $postLink () {
            setRouteLinkComponent();
        }

        vm.$postLink = $postLink;

        function getTagName (type, payload) {
            if (ACTIONS[type] && ACTIONS[type].isButton) {
                return BUTTON;
            } else {
                return LINK;
            }
        }

        function setRouteLinkComponent () {
            $timeout(() => {
                const routeLinkContainer = $element[0].querySelector('.route-link');
                if (routeLinkContainer) {
                    const props = {
                        className: vm.className,
                        inline: vm.inline,
                        hoverText: vm.hoverText,
                        type: vm.type,
                        payload: vm.payload
                    };

                    const innerText = $element.find('ng-transclude').find('span')[0] &&
                        $element.find('ng-transclude').find('span')[0].innerHTML;
                    render(React.createElement(routeLinkWrapper, props, innerText), routeLinkContainer);
                }
            });
        }
    }
})();
