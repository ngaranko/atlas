angular
    .module('atlas')
    .component('dpHeader', {
        templateUrl: 'modules/atlas/components/header/header.html',
        controller: DpHeaderController,
        controllerAs: 'vm'
    });

DpHeaderController.$inject = ['store', 'dashboardColumns', 'HEADER'];

function DpHeaderController(store, dashboardColumns, HEADER) {
    const vm = this;

    vm.store = store;

    store.subscribe(setLayout);
    setLayout();

    function setLayout () { // eslint-disable-line complexity
        const state = store.getState();

        vm.user = state.user;
        vm.activity = dashboardColumns.determineActivity(state);
        vm.visibility = dashboardColumns.determineVisibility(state);

        vm.isHomePageActive = state.page && state.page.name === 'home';
        vm.isHomePage = vm.visibility.page && vm.isHomePageActive;
        vm.headerSize = vm.isHomePage ? HEADER.SIZE.TALL : HEADER.SIZE.SHORT;

        vm.hasMaxWidth = vm.visibility.page;
        vm.pageType = state.page && state.page.type ? state.page.type : '';

        vm.isPrintMode = state.ui.isPrintMode;
        vm.isEmbedPreview = state.ui.isEmbedPreview;
        vm.isEmbed = state.ui.isEmbed;
        vm.isPrintOrEmbedOrPreview = dashboardColumns.isPrintOrEmbedOrPreview(state);
    }
}
