((() => {
    angular
        .module('dpStraatbeeld')
        .component('dpStraatbeeldMetadata', {
            bindings: {
                date: '=',
                location: '=',
                heading: '='
            },
            templateUrl: 'modules/straatbeeld/components/metadata/metadata.html',
            controllerAs: 'vm',
            controller ($scope, $window) {
                let vm = this;

                vm.showMetaInfo = () => angular.isDate(vm.date) && angular.isArray(vm.location);

                vm.openUrl = () => {
                    const path = 'http://maps.google.com/maps?q=&layer=c&';
                    const parameters = `cbll=${vm.location[0]},${vm.location[1]}&cbp=11,${vm.heading},0,0,0`;

                    $window.open (path + parameters);
                };
            }
        });
}))();
