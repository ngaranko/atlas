const linkPO = dp.require('modules/shared/components/link/link.page-objects');

module.exports = function (homepageElement) {
    return {
        get header () {
            return homepageElement.element(by.css('.qa-header')).getText();
        },
        get map () {
            return linkPO(homepageElement.element(by.css('.qa-map')));
        },
        get straatbeeld () {
            return linkPO(homepageElement.element(by.css('.qa-straatbeeld')));
        }
    };
};
