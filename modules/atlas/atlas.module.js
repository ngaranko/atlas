(function () {
    'use strict';

    /* eslint-disable angular/window-service */
    const Raven = window.Raven;
    /* eslint-enable angular/window-service */

    // Configure Raven (client library for Sentry) and register the ngRaven
    // angular plugin with it. This needs to be done here first, so the atlas
    // module can include ngRaven
    Raven
        .config('https://c2a0fef4816844efac43c156559d6fdc@sentry.io/185574')
        .addPlugin(Raven.Plugins.Angular)
        .install();

    angular
        .module('atlas', [
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
            'angulartics.piwik',
            'ngRaven'
        ]);
})();
