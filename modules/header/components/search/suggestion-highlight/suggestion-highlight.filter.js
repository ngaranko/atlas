import escapeStringRegexp from 'escape-string-regexp';

(function () {
    'use strict';

    angular
        .module('dpHeader')
        .filter('suggestionHighlight', suggestionHighlightFilter);

    function suggestionHighlightFilter () {
        return function (suggestion, query) {
            const escapedString = escapeStringRegexp(query);
            return suggestion.replace(new RegExp('(' + escapedString + ')', 'gi'), '<strong>$1</strong>');
        };
    }
})();
