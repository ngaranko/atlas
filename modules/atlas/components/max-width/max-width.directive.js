/**
 * @ngdoc directive
 * @name atlas.directive:dpMaxWidth
 * @restrict: 'A'
 * @description
 * Directive to add the ```is-max-width``` class
 *  to the element on which it is included, based on the state.
 *  This makes sure to have a gray background beyond the max width.
 *
 * Result:
 * <pre>
 *    <div class="is-max-width"></div>
 * </pre>
 *
 */

(function () {
    angular
        .module('atlas')
        .directive('dpMaxWidth', dpMaxWidthDirective);

    dpMaxWidthDirective.$inject = ['store', 'dashboardColumns'];

    function dpMaxWidthDirective (store, dashboardColumns) {
        return {
            restrict: 'A',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            store.subscribe(setMaxWidth);

            function setMaxWidth () {
                const state = store.getState(),
                    visibility = dashboardColumns.determineVisibility(state);

                if (visibility.page) {
                    element.addClass('u-background-color__secondary--gray10');
                } else {
                    element.removeClass('u-background-color__secondary--gray10');
                }
            }
        }
    }
})();
