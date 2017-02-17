describe('Taiga issue #2866', () => {
    fit('when opening a search category, the back button should return you to the list of all search results', () => {
        const page = dp.navigate('MAP_SEARCH-RESULTS--QUERY');
        const searchTitle = page.title;

        // Search for "Dam"
        expect(page.dashboard.rightColumn.searchResults.categories(1).header).toContain('Adressen');

        // Open the 'Adressen' category
        page.dashboard.rightColumn.searchResults.categories(1).showMore.click();
        dp.validate('MAP_SEARCH-RESULTS--CATEGORY', page);

        // Hit the back button, return to the search results overview
        browser.navigate().back();
        dp.validate('MAP_SEARCH-RESULTS--CATEGORY', page);

        expect(page.title).toBe(searchTitle);
    });
});
