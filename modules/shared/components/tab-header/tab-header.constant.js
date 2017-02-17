(function () {
    'use strict';

    angular
        .module('dpShared')
        .constant('TAB_HEADER_CONFIG', {
            'data-datasets': {
                data: {
                    title: 'Data',
                    action: 'FETCH_SEARCH_RESULTS_BY_QUERY',
                    setPayload: query => query || '""'
                },
                datasets: {
                    title: 'Datasets',
                    action: 'FETCH_DATA_SELECTION',
                    setPayload: query => {
                        return {dataset: 'catalogus', view: 'CARDS', query, filters: {}, page: 1};
                    }
                }
            }
        });
})();
