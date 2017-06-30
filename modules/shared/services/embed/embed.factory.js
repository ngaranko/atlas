(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('embed', EmbedFactory);

    EmbedFactory.$inject = ['stateUrlConverter', '$location'];

    function EmbedFactory (stateUrlConverter, $location) {
        return {
            getLink: getLink,
            getHtml: getHtml
        };

        function getLink (state) {
            return $location.protocol() + '://' + $location.host() + ':' +
                $location.port() + stateUrlConverter.state2url(state);
        }

        function getHtml (state) {
            const url = getLink (state);
            return `<iframe width="500" height="400" src="${url}" frameborder="0"></iframe>`;
        }
    }
})();
