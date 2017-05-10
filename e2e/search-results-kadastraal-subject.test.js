describe('Zoekresultaten kadastraal subjecten', () => {
    describe('niet ingelogd', () => {
        it('er mogen geen kadastraal subjecten zichtbaar zijn', () => {
            page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT');
            const searchResults = page.dashboard.rightColumn.searchResults;

            expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

            expect(searchResults.categories(4).header).toBe('Kadastrale subjecten');
            expect(searchResults.categories(4).listCount).toBe(0);
        });
    });

    describe('ingelogd als employee', () => {
        it('er mogen sommige kadastraal subjecten zichtbaar zijn', () => {
            page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT', 'EMPLOYEE');
            const detail = page.dashboard.rightColumn.detail;

            const searchResults = page.dashboard.rightColumn.searchResults;

            expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

            expect(searchResults.categories(4).header).toBe('Kadastrale subjecten (28)');
            expect(searchResults.categories(4).listCount).toBe(10);

            dp.logout();
        });
    });

    describe('ingelogd als employee plus', () => {
        it('alle kadastraal subjecten moeten zichtbaar zijn', () => {
            page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT', 'EMPLOYEE_PLUS');
            const detail = page.dashboard.rightColumn.detail;

            const searchResults = page.dashboard.rightColumn.searchResults;

            expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

            expect(searchResults.categories(4).header).toBe('Kadastrale subjecten (1.346)');
            expect(searchResults.categories(4).listCount).toBe(10);

            dp.logout();
        });
    });
});
