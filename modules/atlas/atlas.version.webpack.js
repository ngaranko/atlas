(function () {
    'use strict';

    angular
        .module('atlas')
        .constant('ATLAS_VERSION', {
            build: __BUILD_ID__ // eslint-disable-line no-undef
        });
})();
