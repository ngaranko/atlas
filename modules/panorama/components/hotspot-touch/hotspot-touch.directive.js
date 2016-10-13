(function () {
    'use strict';
    angular
        .module('dpPanorama')
        .directive('dpHotspotTouch', dpHotspotTouchDirective);

    function dpHotspotTouchDirective () {
        return {
            restrict: 'A',
            scope: { 
                dpHotspotTouch: '='
            },
            link: link
        };
    }
    function link (scope, element) {
        // Add click AND touchsstart events to the element
        element.bind('touchstart click', function () {
            scope.$apply( scope.dpHotspotTouch() );
        });
    }
})();
