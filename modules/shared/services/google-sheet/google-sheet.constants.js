(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('GOOGLE_SHEET_CMS', {
            getStatic: {   // when to get CMS static data (daily refreshed) or dynamically direct from the sheet
                PRODUCTION: true,
                PRE_PRODUCTION: false,
                ACCEPTATION: false,
                DEVELOPMENT: false
            },
            staticAddress: 'https://atlas.amsterdam.nl/cms',
            key: '1ZExuZHhmvBRP-7rhuY43Lv7dWuAsGKXwfKd1_3BZfbI',
            index: {
                news: 1,
                events: 2,
                beleid: 3,
                help: 4,
                snelwegwijs: 5,
                apis: 6,
                versions: 7,
                proclaimer: 8,
                info: 9
            }
        });
})();
