describe('The TabHeader factory', function () {
    let $rootScope,
        $q,
        TAB_HEADER_CONFIG,
        TabHeader;

    beforeEach(function () {
        angular.mock.module('dpShared',
            function ($provide) {
                $provide.constant('TAB_HEADER_CONFIG', {
                    tabs: {
                        tab1: {
                            title: 'Tab1',
                            action: 'ACTION1',
                            getPayload: angular.noop
                        },
                        tab2: {
                            title: 'Tab2',
                            action: 'ACTION2',
                            getPayload: angular.noop
                        }
                    },
                    othertabs: {
                        tab1: {
                            title: 'OtherTab1',
                            action: 'OTHERACTION1',
                            getPayload: angular.noop
                        },
                        tab2: {
                            title: 'OtherTab2',
                            action: 'OTHERACTION2',
                            getPayload: angular.noop
                        }
                    }
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _$q_, _TAB_HEADER_CONFIG_, _TabHeader_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            TAB_HEADER_CONFIG = _TAB_HEADER_CONFIG_;
            TabHeader = _TabHeader_;
        });

        Object.keys(TAB_HEADER_CONFIG.tabs)
            .forEach(key => spyOn(TAB_HEADER_CONFIG.tabs[key], 'getPayload'));
    });

    it('has a constructor that accepts an TAB_HEADER_CONFIG key', function () {
        let tabHeader = new TabHeader('tabs');
        expect(tabHeader.tabs.length).toBe(2);
        tabHeader.tabs.forEach(tab => {
            let configTab = TAB_HEADER_CONFIG.tabs[tab.id];
            expect(tab.title).toBe(configTab.title);
            expect(tab.action).toBe(configTab.action);
            expect(tab.count).toBe(null);
            expect(tabHeader.tab[tab.id]).toEqual(tab);
        });
    });

    it('reuses any already created tabheader with the same key', function () {
        let tabHeader = new TabHeader('tabs');
        tabHeader.tab.tab1.isActive = true;
        tabHeader.tab.tab1.count = 1;

        tabHeader = new TabHeader('othertabs');
        expect(tabHeader.tab.tab1.isActive).toBe(false);
        expect(tabHeader.tab.tab1.count).toBe(null);

        tabHeader = new TabHeader('tabs');
        expect(tabHeader.tab.tab1.isActive).toBe(true);
        expect(tabHeader.tab.tab1.count).toBe(1);
    });

    it('can set the active tab to any given tab of the tabheader', function () {
        let tabHeader = new TabHeader('tabs');
        tabHeader.tabs.forEach(tab => {
            expect(tab.isActive).toBe(false);
        });
        tabHeader.activeTab = tabHeader.tab.tab1;
        tabHeader.tabs.forEach(tab => {
            expect(tab.isActive).toBe(tab === tabHeader.tab.tab1);
        });
    });

    it('can set the query that unites the tab header pages', function () {
        let tabHeader = new TabHeader('tabs'),
            query = 'a query';

        tabHeader.query = query;

        Object.keys(TAB_HEADER_CONFIG.tabs)
            .forEach(key => expect(TAB_HEADER_CONFIG.tabs[key].getPayload).toHaveBeenCalledWith(query));
    });

    it('does not update the payload if called with the same query', function () {
        let tabHeader = new TabHeader('tabs'),
            query = 'a query';

        tabHeader.query = query;

        Object.keys(TAB_HEADER_CONFIG.tabs)
            .forEach(key => expect(TAB_HEADER_CONFIG.tabs[key].getPayload.calls.reset()));

        tabHeader.query = query;

        Object.keys(TAB_HEADER_CONFIG.tabs)
            .forEach(key => expect(TAB_HEADER_CONFIG.tabs[key].getPayload).not.toHaveBeenCalled());
    });

    it('accepts a count provider that can return counts for non-active pages', function () {
        let tabHeader = new TabHeader('tabs'),
            count = 100,
            getCount = () => $q.resolve(count),
            query = 'a query';

        TabHeader.provideCounter(TAB_HEADER_CONFIG.tabs.tab1.action, getCount);
        tabHeader.query = query;

        $rootScope.$apply();

        expect(tabHeader.tab.tab1.count).toBe(count);
        expect(tabHeader.tab.tab2.count).toBe(null);
    });
});
