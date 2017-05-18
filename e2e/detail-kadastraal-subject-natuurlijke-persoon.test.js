describe('Detail kadastraal subject - natuurlijke persoon', () => {
    describe('niet ingelogd', () => {
        it('er mogen geen subject en rechten zichtbaar zijn', () => {
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NATUURLIJKE-PERSOON'),
                detail = page.dashboard.rightColumn.detail;

            expect(page.title).toBe('Dataportaal');

            expect(detail.natuurlijkPersoon.isPresent).toBe(false);
            expect(detail.nietNatuurlijkPersoon.isPresent).toBe(false);

            expect(detail.kadastraalSubject.isPresent).toBe(true);
            expect(detail.kadastraalSubject.glossaryHeader.subtitle).toBe('Kadastraal subject');

            expect(detail.kadastraalSubjectRecht.isPresent).toBe(false);
        });
    });

    describe('ingelogd als employee', () => {
        it('er mag alleen subject informatie zichtbaar zijn', () => {
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NATUURLIJKE-PERSOON', 'EMPLOYEE'),
                detail = page.dashboard.rightColumn.detail;

            expect(page.title).toBe('Kadastraal subject: Barbara Bakker - Dataportaal');

            expect(detail.natuurlijkPersoon.isPresent).toBe(true);
            expect(detail.nietNatuurlijkPersoon.isPresent).toBe(false);

            expect(detail.kadastraalSubject.isPresent).toBe(true);
            expect(detail.kadastraalSubject.glossaryHeader.title).toBe('Barbara Bakker');
            expect(detail.kadastraalSubject.glossaryHeader.subtitle).toBe('Kadastraal subject');

            expect(detail.kadastraalSubject.descriptionList.term(0)).toBe('Voornamen');
            expect(detail.kadastraalSubject.descriptionList.definition(0)).toBe('Barbara');
            expect(detail.kadastraalSubject.descriptionList.term(1)).toBe('Voorvoegsels');
            expect(detail.kadastraalSubject.descriptionList.definition(1)).toBe('');
            expect(detail.kadastraalSubject.descriptionList.term(2)).toBe('Geslachtsnaam');
            expect(detail.kadastraalSubject.descriptionList.definition(2)).toBe('Bakker');
            expect(detail.kadastraalSubject.descriptionList.term(3)).toBe('Geslacht');
            expect(detail.kadastraalSubject.descriptionList.definition(3)).toBe('Vrouw');
            expect(detail.kadastraalSubject.descriptionList.term(4)).toBe('Geboortedatum');
            expect(detail.kadastraalSubject.descriptionList.definition(4)).toBe('1971-07-23');
            expect(detail.kadastraalSubject.descriptionList.term(5)).toBe('Geboorteplaats');
            expect(detail.kadastraalSubject.descriptionList.definition(5)).toBe('AMSTERDAM');
            expect(detail.kadastraalSubject.descriptionList.term(8)).toBe('Woonadres');
            expect(detail.kadastraalSubject.descriptionList.definition(8)).toBe('Overtoom 34-1 1054HK AMSTERDAM');

            expect(detail.kadastraalSubjectRecht.isPresent).toBe(true);
            expect(detail.kadastraalSubjectRecht.listCount).toBe(0);

            dp.logout();
        });
    });

    describe('ingelogd als employee plus', () => {
        it('er moeten zowel subject als rechten zichtbaar zijn', () => {
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NATUURLIJKE-PERSOON', 'EMPLOYEE_PLUS'),
                detail = page.dashboard.rightColumn.detail;

            expect(page.title).toBe('Kadastraal subject: Barbara Bakker - Dataportaal');

            expect(detail.natuurlijkPersoon.isPresent).toBe(true);
            expect(detail.nietNatuurlijkPersoon.isPresent).toBe(false);

            expect(detail.kadastraalSubject.isPresent).toBe(true);
            expect(detail.kadastraalSubject.glossaryHeader.title).toBe('Barbara Bakker');
            expect(detail.kadastraalSubject.glossaryHeader.subtitle).toBe('Kadastraal subject');

            expect(detail.kadastraalSubjectRecht.isPresent).toBe(true);
            expect(detail.kadastraalSubjectRecht.listCount).toBe(1);
            expect(detail.kadastraalSubjectRecht.list(0).text).toBe('ASD05G08575A0001 - Eigendom (recht van) (1/3)');

            dp.logout();
        });
    });
});
