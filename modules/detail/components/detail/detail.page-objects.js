'use strict';

const glossaryHeader = dp.require('modules/detail/components/glossary/header/glossary-header.page-objects');
const nummeraanduidingHeader =
    dp.require('modules/detail/components/nummeraanduiding-header/nummeraanduiding-header.page-objects');
const straatbeeldThumbnail =
    dp.require('modules/shared/components/straatbeeld-thumbnail/straatbeeld-thumbnail.page-objects');

module.exports = function (detailElement) {
    return {
        get visible () {
            return dp.visible(detailElement);
        },
        get nummeraanduiding () {
            return groupedDataPageObject(detailElement.element(by.css('.qa-nummeraanduiding')));
        },
        get straatbeeldThumbnail () {
            return straatbeeldThumbnail(detailElement.element(by.css('dp-straatbeeld-thumbnail')));
        },
        get verblijfsobject () {
            return groupedDataPageObject(detailElement.element(by.css('.qa-verblijfsobject')));
        }
    };
};

function groupedDataPageObject (groupedDataElement) {
    return {
        get glossaryHeader () {
            return glossaryHeader(groupedDataElement.element(by.css('dp-glossary-header')));
        },
        get nummeraanduidingHeader () {
            return nummeraanduidingHeader(groupedDataElement.element(by.css('dp-nummeraanduiding-header')));
        },
        get descriptionList () {
            return descriptionListPageObject(groupedDataElement.element(by.css('dl')));
        }
    };
}

function descriptionListPageObject (definitionListElement) {
    return {
        term: function (index) {
            return definitionListElement.all(by.css('dt')).get(index).getText();
        },
        definition: function (index) {
            return definitionListElement.all(by.css('dd')).get(index).getText();
        }
    };
}
