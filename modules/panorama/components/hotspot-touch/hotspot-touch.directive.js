(function () {
    'use strict';
    angular
        .module('dpPanorama')
        .directive('dpClick', dpClickDirective);

    function dpClickDirective () {
        return {
            restrict: 'A',
            scope: { 
                dpClick: '='
            },
            link: link
        };
    }
    function link (scope, element) {
        // Add click AND touchsstart events to the element
        element.bind('touchstart click', function () {
            scope.$apply( scope.dpClick() );
        });
    } 
})();
