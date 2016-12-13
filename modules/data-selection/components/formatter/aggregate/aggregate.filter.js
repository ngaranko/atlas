(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .filter('aggregate', aggregateFilter);

    function aggregateFilter () {
        return function (input) {
            const result = input.reduce((aggregation, value) => {
                const counter = aggregation.find(item => item.name === value);

                if (counter) {
                    counter.count++;
                } else {
                    aggregation.push({
                        name: value,
                        count: 1
                    });
                }

                return aggregation;
            }, []);

            return result.sort((a, b) => {
                let order = 0;

                if (a.count < b.count) {
                    order = 1;
                } else if (a.count > b.count) {
                    order = -1;
                } else if (a.name > b.name) {
                    order = 1;
                } else if (a.name < b.name) {
                    order = -1;
                }

                return order;
            });
        };
    }
})();
