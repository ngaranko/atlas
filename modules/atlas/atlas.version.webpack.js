/**
 * For the webpack build process this file will be used instead of
 * `atlas.version.js` which is being generated from `atlas.version.js.template`
 * by the grunt build process
 */

(function () {
    'use strict';

    angular
        .module('atlas')
        .constant('ATLAS_VERSION', {
            build: __BUILD_ID__ // eslint-disable-line no-undef
        });
})();
