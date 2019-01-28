import { ENVIRONMENTS } from '../../../../src/shared/environment';

(function () {
    'use strict';

    angular
        .module('atlas')
        .constant('PIWIK_CONFIG', {
            [ENVIRONMENTS.PRODUCTION]: {
                SITE_ID: 1
            },
            [ENVIRONMENTS.PRE_PRODUCTION]: {
                SITE_ID: 3
            },
            [ENVIRONMENTS.ACCEPTANCE]: {
                SITE_ID: 3
            },
            [ENVIRONMENTS.DEVELOPMENT]: {
                SITE_ID: 3
            }
        });
})();
