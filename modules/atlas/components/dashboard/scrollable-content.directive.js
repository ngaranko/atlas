(function () {
    'use strict';

    angular
        .module('atlas')
        .directive('atlasScrollableContent', atlasScrollableContentDirective);

    /**
     * @description This will reset the scroll position whenever the active component (e.g. atlas-detail, atlas-page,
     * atlas-search-results) changes.
     */
    function atlasScrollableContentDirective () {
        return {
            restrict: 'A',
            scope: {
                visibility: '='
            },
            link: linkFunction
        };

        function linkFunction (scope, element) {
            var rightColumnContent = null;

            scope.$watch('visibility', function (visibility) {
                if (rightColumnContent !== checkRightColumnContent(visibility)) {
                    element.scrollTop = 0;

                    rightColumnContent = checkRightColumnContent(visibility);
                }
            });

            function checkRightColumnContent (visibility) {
                var components = ['page', 'detail', 'searchResults', 'dataSelection'],
                    i;

                for (i = 0; i < components.length; i++) {
                    if (visibility[components[i]]) {
                        return components[i];
                    }
                }

                return null;
            }
        }
    }
})();