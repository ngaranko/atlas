(function () {
    angular
        .module('atlas')
        .directive('dpPrintState', DpPrintStateDirective);

    DpPrintStateDirective.$inject = ['store'];

    function DpPrintStateDirective (store) {
        return {
            restrict: 'A',
            link: linkFunction
        };

        function linkFunction (scope, element) {
            store.subscribe(setPrintMode);
            setPrintMode();

            function setPrintMode () {
                var state = store.getState();

                if (state.isPrintMode) {
                    element.addClass('is-print-mode');
                    if (state.detail === null && state.page === null && state.search === null) {
                        element.addClass('print-landscape');
                    } else {
                        element.removeClass('print-landscape');
                    }
                } else {
                    element.removeClass('is-print-mode');
                }
            }
        }
    }
})();
