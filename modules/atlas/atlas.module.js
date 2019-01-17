(function () {
    'use strict';

    const moduleDependencies = [
        // Main modules
        'dpHeader',
        'dpPage',
        'dpDetail',
        'dpDataSelection',

        // Shared module
        'dpShared',
        'ngAria'
    ];

    // eslint-disable-next-line angular/di
    angular.module('atlas', moduleDependencies)
        .config(['$provide', urlChangeProvider]);

    urlChangeProvider.$inject = ['$provide'];
    /* istanbul ignore next */
    function urlChangeProvider ($provide) {
        $provide.decorator('$browser', ['$delegate', function ($delegate) {
            $delegate.onUrlChange = function () { };
            $delegate.url = function () { return ''; };
            return $delegate;
        }]);
    }
})();
