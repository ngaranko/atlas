'use strict';

const
    link = dp.require('modules/shared/components/link/link.page-objects'),
    toggleStraatbeeldFullscreen = dp.require('modules/straatbeeld/components/toggle-straatbeeld-fullscreen/' +
        'toggle-straatbeeld-fullscreen.page-objects'),
    hotspot = dp.require('modules/straatbeeld/components/hotspot/hotspot.page-objects');

module.exports = function (straatbeeldElement) {
    return {
        get close () {
            return link(straatbeeldElement.element(by.css('.c-straatbeeld > dp-link')));
        },
        get visible () {
            return dp.visible(straatbeeldElement);
        },
        get toggleStraatbeeldFullscreen () {
            return toggleStraatbeeldFullscreen(straatbeeldElement.element(by.css('dp-straatbeeld-fullscreen')));
        },
        hotspots: function (index) {
            return hotspot(straatbeeldElement.all(by.css('dp-hotspot')).get(index));
        }
    };
};
