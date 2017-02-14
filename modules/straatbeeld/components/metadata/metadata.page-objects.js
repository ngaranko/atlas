'use strict';

module.exports = function (metadataElement) {
    return {
        get coordinates () {
            return metadataElement.element(by.css('.c-straatbeeld-metadata__coordinates')).getText();
        }
    };
};
