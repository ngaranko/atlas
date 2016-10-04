(function () {
    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['documentTitle']

    function runBlock (documentTitle) {
        documentTitle.initialize();
    }
})();