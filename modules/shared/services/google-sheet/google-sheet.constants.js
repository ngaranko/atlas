(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('GOOGLE_SHEET_CMS', {
            key: '1aQF5boEYQvXPESFumP0we4CoKuL8hpkZhFy43mTtmrM',
            index: {
                news: 1,
                events: 2,
                beleid: 3,
                help: 4,
                snelwegwijs: 5,
                apis: 6,
                versions: 7,
                proclaimer: 8
            }
        });
})();
