(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('queryStringParser', queryStringParserFactory);

    function queryStringParserFactory () {
        return (queryString) => {
            return queryString
                ? queryString
                    .substring(1)
                    .split('&')
                    .reduce((params, query) => {
                        const keyValue = query.split('=');
                        params[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
                        return params;
                    }, {})
                : null;
        };
    }
})();
