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

                    // if (state.map.isFullscreen) {
                    //     element.addClass('is-fullscreen');
                    // } else {
                    //     element.removeClass('is-fullscreen');
                    // }
                } else {
                    element.removeClass('is-print-mode');
                }
            }
        }
    }
})();
