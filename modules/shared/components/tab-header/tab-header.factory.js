(function () {
    'use strict';

    angular
        .module('dpShared')
        .factory('TabHeader', tabHeaderFactory);

    tabHeaderFactory.$inject = ['TAB_HEADER_CONFIG'];

    function tabHeaderFactory (TAB_HEADER_CONFIG) {
        let countProvider = {},
            tabHeader = {};

        class TabPage {
            constructor (id, {title, action, setPayload}) {
                this._id = id;
                this._title = title;
                this._action = action;
                this._setPayload = setPayload;
                this._count = null;
            }

            get id () {
                return this._id;
            }

            get title () {
                return this._title;
            }

            get action () {
                return this._action;
            }

            get payload () {
                return this._payload;
            }

            get isActive () {
                return !!this._isActive;
            }

            set isActive (isActive) {
                this._isActive = isActive;
            }

            set query (query) {
                this._payload = this._setPayload(query);
            }

            get count () {
                return this._count;
            }

            set count (value) {
                this._count = value;
            }
        }

        class TabHeader {
            constructor (id) {
                if (tabHeader[id]) {
                    ['_tabs', '_tab'].forEach(key => this[key] = tabHeader[id][key]);
                } else {
                    this._tabs = Object.keys(TAB_HEADER_CONFIG[id])
                        .map(key => new TabPage(key, TAB_HEADER_CONFIG[id][key]));
                    this._tab = this._tabs.reduce((all, tab) => {
                        all[tab.id] = tab;
                        return all;
                    }, {});
                    tabHeader[id] = this;
                }
            }

            get tabs () {
                return this._tabs;
            }

            get tab () {
                return this._tab;
            }

            set activeTab (theActiveTab) {
                this._tabs.forEach(tab => tab.isActive = tab.id === theActiveTab.id);
            }

            set query (query) {
                this._tabs.forEach(tab => {
                    tab.query = query;
                    if (!tab.isActive && countProvider[tab.action]) {
                        // active tabs update their count directly
                        // non-active tabs rely on a provider that is able to return the count
                        countProvider[tab.action](tab.payload).then(count => {
                            tab.count = count;
                        });
                    }
                });
            }

            static provideCounter (action, getCount) {
                countProvider[action] = getCount;
            }
        }

        return TabHeader;
    }
})();
