(function () {
    'use strict';

    const moduleDependencies = [
        // Main modules
        'dpHeader',
        'dpPage',
        'dpDetail',
        'dpSearchResults',
        'dpLayerSelection',
        'dpMap',
        'dpStraatbeeld',
        'dpDataSelection',

        // Shared module
        'dpShared',

        // Third party modules
        'angulartics.piwik'
    ];

    /* eslint-disable angular/window-service */
    if (window.location.hostname === 'data.amsterdam.nl') {
        const Raven = window.Raven;
        /* eslint-enable angular/window-service */

        // Configure Raven (client library for Sentry) and register the ngRaven
        // angular plugin with it. This needs to be done here first, so the atlas
        // module can include ngRaven
        Raven
            .config('https://e787d53c011243b59ae368a912ee6d3f@sentry.datapunt.amsterdam.nl/2')
            .addPlugin(Raven.Plugins.Angular)
            .install();

        moduleDependencies.push('ngRaven');
    } else {
        angular.module('ngRaven', []).service('Raven', angular.noop);
    }

    angular
        .module('atlas', moduleDependencies);
})();
