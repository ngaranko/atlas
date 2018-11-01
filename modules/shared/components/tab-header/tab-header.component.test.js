describe('The tabHeader component', function () {
    let $compile,
        $rootScope,
        mockedSearchText,
        mockedActiveItems,
        mockedInactiveItems;

    beforeEach(function () {
        mockedSearchText = 'AnySearchText';

        mockedActiveItems = [1].map(i => getMockedItem(i, {isActive: true, count: i})); // One active tab

        mockedInactiveItems = [0, 1, 2].map(i => getMockedItem(i, {count: i || null})); // Multipe inactive tabs

        angular.mock.module('dpShared',
            function ($provide) {
                $provide.factory('dpLinkDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getMockedItem (id, tpl = {}) {
        const mockedItem = { title: 'title' + id, action: 'action' + id, payload: 'payload' + id };
        return angular.merge(mockedItem, tpl);
    }

    function getComponent (title, tabs) {
        const element = document.createElement('dp-tab-header');
        element.setAttribute('search-text', 'searchText');
        element.setAttribute('tab-header', 'tabHeader');

        const scope = $rootScope.$new();

        scope.searchText = title;
        scope.tabHeader = {tabs};

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('accepts a title and an array of tabs', function () {
        const component = getComponent(mockedSearchText, []);
        expect(component.find('ul dp-redux-link').length).toBe(0);
        expect(component.find('.qa-tab-header__active').length).toBe(0);
    });

    it('shows the search text in the header', function () {
        const component = getComponent(mockedSearchText, mockedActiveItems);
        expect(component.find('.qa-tab-header__title .c-tab-header__title__text').text()
            .trim()).toBe('Resultaten met \'AnySearchText\'');
    });

    it('does show "Geen resultaten" and the search text in the header when no results are found', function () {
        const component = getComponent(mockedSearchText, []);
        expect(component.find('.qa-tab-header__title .c-tab-header__title__text').text()
            .trim()).toBe('Geen resultaten met \'AnySearchText\'');
    });

    it('shows a tip when no results are found', function () {
        const component = getComponent(mockedSearchText, []);
        expect(component.text()).toContain('Tip: ');
    });

    it('shows a link with the title for each non-active tab', function () {
        mockedInactiveItems[0].count = 0;
        const component = getComponent(mockedSearchText, mockedInactiveItems);
        expect(component.find('ul dp-redux-link').length).toBe(mockedInactiveItems.length);
        mockedInactiveItems.forEach((item, i) => {
            expect(component.find('ul dp-redux-link').eq(i).text().trim())
                .toBe(item.title + ' (' + item.count + ')');
            expect(component.find('ul dp-redux-link').eq(i).attr('to')).toBe('tab.linkTo');
        });
        expect(component.find('.qa-tab-header__active').length).toBe(0);
    });

    it('shows a tab with the title and number of items for the active tab', function () {
        const component = getComponent(mockedSearchText, mockedActiveItems);
        expect(component.find('ul dp-redux-link').length).toBe(0);
        expect(component.find('.qa-tab-header__active').length).toBe(mockedActiveItems.length);
        mockedActiveItems.forEach((item, i) => {
            expect(component.find('.qa-tab-header__active').eq(i).text().trim())
                .toBe(item.title + ' (' + item.count + ')');
        });
    });

    it('shows tabs for inactive and active items', function () {
        mockedInactiveItems[0].count = 0;
        const component = getComponent(mockedSearchText, mockedActiveItems.concat(mockedInactiveItems));
        expect(component.find('ul dp-redux-link').length).toBe(mockedInactiveItems.length);
        expect(component.find('.qa-tab-header__active').length).toBe(mockedActiveItems.length);
    });
});
