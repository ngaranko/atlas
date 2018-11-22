import { FETCH_DATASETS_REQUEST } from '../../../../src/shared/ducks/datasets/data/data';
import { FETCH_SEARCH_RESULTS_BY_QUERY } from '../../../../src/shared/ducks/data-search/data-search';

export const datasetsKey = 'datasets';

(function () {
    'use strict';

    // TODO: refactor, get rid of this file along with tab-header.factory and provideCounter magic
    angular
        .module('dpShared')
        .constant('TAB_HEADER_CONFIG', {
            'data-datasets': {
                data: {
                    title: 'Data',
                    action: FETCH_SEARCH_RESULTS_BY_QUERY,
                    getPayload: (query) => query,
                    tip: 'maak de zoekcriteria minder specifiek (bijv. een straat i.p.v. specifiek adres)'
                },
                [datasetsKey]: {
                    title: 'Datasets',
                    action: FETCH_DATASETS_REQUEST,
                    getPayload: (query) => {
                        return { query, page: 1 };
                    },
                    tip: `maak de zoekcriteria minder specifiek. Of probeer in plaats van zoeken eens de
                          optie 'Alle datasets tonen' en filter vervolgens op thema.`
                }
            }
        });
})();
