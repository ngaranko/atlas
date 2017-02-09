'use strict';

module.exports = function (straatbeeldThumbnailElement) {
    return {
        click: straatbeeldThumbnailElement.element(by.css('.qa-straatbeeld-thumbnail-close')).click
    };
};
