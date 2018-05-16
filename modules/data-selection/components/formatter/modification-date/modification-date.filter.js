(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('modificationDate', modificationDateFilter);

    function modificationDateFilter () {
        return function (input) {
            if (angular.isObject(input)) {
                const created = input.metadata_created;

                const last = new Date(created);
                const now = new Date();
                if (now < last) return 'is in de toekomst gemaakt';
                let ago = now - last,
                    agoCount = ago,
                    agoDuration = 'milliseconden';
                [
                    { duration: 'seconden', length: 1000 },
                    { duration: 'minuten', length: 60 },
                    { duration: 'uren', length: 60 },
                    { duration: 'dagen', length: 24 }
                ].forEach(({duration, length}) => {
                    if (ago >= 2 * length) {
                        ago = Math.ceil(ago / length);
                        agoCount = ago;
                        agoDuration = duration;
                    } else {
                        ago = 0;
                    }
                });

                return `${agoCount} ${agoDuration} geleden gemaakt`;
            }
        };
    }
})();
