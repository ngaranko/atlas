describe('Zoekresultaten kadastraal subjecten', () => {
    let page,
        searchResults;

    beforeEach(() => {
        page = dp.navigate('PAGE--HOME');
        searchResults = page.dashboard.rightColumn.searchResults;
    });

    describe('niet ingelogd', () => {
        it('er mogen geen kadastraal subjecten zichtbaar zijn', () => {
            dp.search('Bakker');

            expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

            expect(searchResults.categories(0).header).toContain('Openbare ruimtes');
            expect(searchResults.categories(1).header).toContain('Adressen');
        });
    });

    describe('ingelogd', () => {
        afterEach(() => {
            dp.authenticate.logout();
        });

        describe('als EMPLOYEE', () => {
            it('sommige kadastraal subjecten mogen zichtbaar zijn (alleen niet natuurlijke personen))', () => {
                dp.authenticate.login('EMPLOYEE');

                dp.search('Bakker');

                expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

                expect(searchResults.categories(3).header).toContain('Maatschappelijke activiteiten');

                expect(searchResults.categories(4).header).toContain('Kadastrale subjecten (26)');
                expect(searchResults.categories(4).listCount).not.toBe(0);
            });
        });

        describe('als EMPLOYEE_PLUS', () => {
            it('alle kadastraal subjecten moeten zichtbaar zijn', () => {
                dp.authenticate.login('EMPLOYEE_PLUS');

                dp.search('Bakker');

                expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

                expect(searchResults.categories(3).header).toContain('Maatschappelijke activiteiten');

                expect(searchResults.categories(4).header).toContain('Kadastrale subjecten (1.347)');
                expect(searchResults.categories(4).listCount).not.toBe(0);
            });
        });
    });
});
