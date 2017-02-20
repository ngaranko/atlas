describe('Taiga issue #2866', () => {
    it('when opening a search category, the back button should return you to the list of all search results', () => {
        const page = dp.navigate('PAGE--HOME');

        // Search for "Dam"
        page.dashboard.header.search.setQuery('dam');
        page.dashboard.header.search.submit();

        expect(page.dashboard.rightColumn.searchResults.categories(1).header).toContain('Adressen');
        const searchTitle = page.title;

        // Open the 'Adressen' category
        page.dashboard.rightColumn.searchResults.categories(1).showMore.click();
        dp.validate('MAP_SEARCH-RESULTS--CATEGORY', page);

        // Hit the back button, return to the search results overview
        browser.navigate().back();
        dp.validate('MAP_SEARCH-RESULTS--QUERY', page);

        expect(page.title).toBe(searchTitle);
    });
});
