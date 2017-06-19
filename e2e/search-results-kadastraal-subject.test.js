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

        ['EMPLOYEE', 'EMPLOYEE_PLUS'].forEach(role => {
            describe('als ' + role, () => {
                it('er mogen sommige kadastraal subjecten zichtbaar zijn', () => {
                    dp.authenticate.login(role);

                    dp.search('Bakker');

                    expect(page.title).toBe('Data met \'Bakker\' - Dataportaal');

                    expect(searchResults.categories(3).header).toContain('Maatschappelijke activiteiten');

                    expect(searchResults.categories(4).header).toContain('Kadastrale subjecten');
                    expect(searchResults.categories(4).listCount).not.toBe(0);
                });
            });
        });
    });
});
