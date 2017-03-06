(function () {
    'use strict';

    angular
        .module('dpPage')
        .component('dpUserContentWidget', {
            bindings: {
                type: '@'
            },
            templateUrl: 'modules/page/components/user-content-widget/user-content-widget.html',
            controller: DpUserContentWidgetController,
            controllerAs: 'vm'
        });

    DpUserContentWidgetController.$inject = ['googleSheet', 'GOOGLE_SHEET_CMS'];

    function DpUserContentWidgetController (googleSheet, GOOGLE_SHEET_CMS) {
        let vm = this;

        vm.feed = null;
        vm.entries = [];

        googleSheet.getContents(GOOGLE_SHEET_CMS.key, GOOGLE_SHEET_CMS.index[vm.type])
            .then(contents => {
                vm.feed = contents.feed;
                vm.entries = contents.entries;
            });
    }
})();
