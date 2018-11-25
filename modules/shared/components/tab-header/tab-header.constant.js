import tabHeaderConfig from '../../../../src/shared/services/tab-header/tab-header';

(function () {
    'use strict';

    // TODO: refactor, get rid of this file along with tab-header.factory and provideCounter magic
    angular
        .module('dpShared')
        .constant('TAB_HEADER_CONFIG', tabHeaderConfig);
})();
