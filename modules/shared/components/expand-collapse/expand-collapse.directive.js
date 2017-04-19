(function () {
    angular
        .module('atlas')
        .directive('dpExpandCollapse', DpExpandCollapseDirective);

    DpExpandCollapseDirective.$inject = [];

    function DpExpandCollapseDirective () {
        return {
            restrict: 'A',
            link: linkFn
        };

        function linkFn (scope, element, attrs, controller, transcludeFn) {
            console.log('dpExpandCollapse');
        }
    }
})();
