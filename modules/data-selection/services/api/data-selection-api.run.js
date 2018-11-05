import { query } from '../../../../src/shared/services/data-selection/data-selection-api';

(function () {
    'use strict';

    angular
        .module('dpDataSelection')
        .run(runBlock);

    runBlock.$inject = ['TabHeader'];

    function runBlock (TabHeader) {
        TabHeader.provideCounter('FETCH_DATA_SELECTION', queryCount);
    }

    function queryCount (payload) {
        return query(payload.dataset, payload.view, payload.filters, payload.page, payload.query, [])
            .then(results => results.numberOfRecords);
    }
})();
