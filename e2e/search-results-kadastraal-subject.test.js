describe('Zoekresultaten kadastraal subjecten', () => {
    describe('niet ingelogd', () => {
        it('er mogen geen kadastraal subjecten zichtbaar zijn', () => {
            const page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT'),
                searchResults = page.dashboard.rightColumn.searchResults;

            expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

            expect(searchResults.categories(4).header).toBe('Kadastrale subjecten');
            expect(searchResults.categories(4).listCount).toBe(0);
        });
    });

    describe('ingelogd', () => {

        afterEach(() => {
            dp.authenticate.logout();
        });

        describe('als employee', () => {
            it('er mogen sommige kadastraal subjecten zichtbaar zijn', () => {
                dp.authenticate.login('EMPLOYEE');

                const page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT'),
                    searchResults = page.dashboard.rightColumn.searchResults;

                expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

                expect(searchResults.categories(4).header).toBe('Kadastrale subjecten (28)');
                expect(searchResults.categories(4).listCount).toBe(10);
            });
        });

        describe('als employee plus', () => {
            it('alle kadastraal subjecten moeten zichtbaar zijn', () => {
                dp.authenticate.login('EMPLOYEE_PLUS');

                const page = dp.navigate('SEARCH-RESULTS--KADASTRAAL-SUBJECT'),
                    searchResults = page.dashboard.rightColumn.searchResults;

                expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

                expect(searchResults.categories(4).header).toBe('Kadastrale subjecten (1.346)');
                expect(searchResults.categories(4).listCount).toBe(10);
            });
        });
    });
});
