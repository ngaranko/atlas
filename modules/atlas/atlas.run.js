const templates = require.context('..', true, /\.html$/);

(function () {
    'use strict';

    angular
        .module('atlas')
        .run(runBlock);

    runBlock.$inject = ['$templateCache'];

    function runBlock ($templateCache) {
        templates.keys().forEach((key) => {
            // Remove the dot from './dir/template.html' and prepend with
            // 'modules' to get 'modules/dir/template.html'.
            const templateId = 'modules' + key.substr(1);
            $templateCache.put(templateId, templates(key));
        });
    }
})();
