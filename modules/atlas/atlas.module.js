(function () {
    'use strict';

    const moduleDependencies = [
        // Main modules
        'dpHeader',
        'dpPage',
        'dpDetail',
        'dpSearchResults',
        'dpMap',
        'dpStraatbeeld',
        'dpDataSelection',

        // Shared module
        'dpShared',

        // Third party modules
        'angulartics.piwik',
        'ngRaven',

        'ngAria'
    ];

    /* eslint-disable angular/window-service */
    const Raven = window.Raven;

    const ravenConfig = {
        environment: window.location.hostname
    };

    /* istanbul ignore next */
    if (ravenConfig.environment === 'data.amsterdam.nl') {
        ravenConfig.sentryEndpoint = 'https://e787d53c011243b59ae368a912ee6d3f@sentry.datapunt.amsterdam.nl/2';
    } else if (ravenConfig.environment === 'acc.amsterdam.nl') {
        ravenConfig.sentryEndpoint = 'https://f52176a24eae4ad9acb7acc3fd5f7cdc@sentry.datapunt.amsterdam.nl/4';
    } else {
        Raven.setShouldSendCallback(() => false);
        Raven.isSetup = () => true;
    }
    /* eslint-enable angular/window-service */

    // Configure Raven (client library for Sentry) and register the ngRaven
    // angular plugin with it. This needs to be done here first, so the atlas
    // module can include ngRaven

    /* istanbul ignore next */
    if (Raven) {
        Raven
            .config(ravenConfig.sentryEndpoint, ravenConfig)
            .addPlugin(Raven.Plugins.Angular)
            .install();
    }

    angular.module('atlas', moduleDependencies);
})();
