describe('Detail kadastraal subject - niet natuurlijke persoon', () => {
    describe('niet ingelogd', () => {
        it('er mogen geen subject en rechten zichtbaar zijn', () => {
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NIET-NATUURLIJKE-PERSOON'),
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
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NIET-NATUURLIJKE-PERSOON', 'EMPLOYEE'),
                detail = page.dashboard.rightColumn.detail;

            expect(page.title).toBe('Kadastraal subject: Bakker & Toledo Holding B.V. - Dataportaal');

            expect(detail.natuurlijkPersoon.isPresent).toBe(false);
            expect(detail.nietNatuurlijkPersoon.isPresent).toBe(true);

            expect(detail.kadastraalSubject.isPresent).toBe(true);
            expect(detail.kadastraalSubject.glossaryHeader.title).toBe('Bakker & Toledo Holding B.V.');
            expect(detail.kadastraalSubject.glossaryHeader.subtitle).toBe('Kadastraal subject');

            expect(detail.kadastraalSubject.descriptionList.term(0)).toBe('Statutaire zetel');
            expect(detail.kadastraalSubject.descriptionList.definition(0)).toBe('OOSTZAAN');
            expect(detail.kadastraalSubject.descriptionList.term(1)).toBe('Rechtsvorm');
            expect(detail.kadastraalSubject.descriptionList.definition(1)).toBe('Besloten vennootschap');
            expect(detail.kadastraalSubject.descriptionList.term(2)).toBe('RSIN');
            expect(detail.kadastraalSubject.descriptionList.definition(2)).toBe('822730790');
            expect(detail.kadastraalSubject.descriptionList.term(3)).toBe('KvK nummer');
            expect(detail.kadastraalSubject.descriptionList.definition(3)).toBe('50417703');
            expect(detail.kadastraalSubject.descriptionList.term(4)).toBe('Woonadres');
            expect(detail.kadastraalSubject.descriptionList.definition(4)).toBe('Rietschoot 106 1511WN OOSTZAAN');

            expect(detail.kadastraalSubjectRecht.isPresent).toBe(true);
            expect(detail.kadastraalSubjectRecht.listCount).toBe(1);
            expect(detail.kadastraalSubjectRecht.list(0).text).toBe('OZN00C03755A0008 - Eigendom (recht van) (1/1)');

            dp.logout();
        });
    });

    describe('ingelogd als employee plus', () => {
        it('er moeten zowel subject als rechten zichtbaar zijn', () => {
            const page = dp.navigate('DETAIL-KADASTRAAL-SUBJECT--NIET-NATUURLIJKE-PERSOON', 'EMPLOYEE_PLUS'),
                detail = page.dashboard.rightColumn.detail;

            expect(page.title).toBe('Kadastraal subject: Bakker & Toledo Holding B.V. - Dataportaal');

            expect(detail.natuurlijkPersoon.isPresent).toBe(false);
            expect(detail.nietNatuurlijkPersoon.isPresent).toBe(true);

            expect(detail.kadastraalSubject.isPresent).toBe(true);
            expect(detail.kadastraalSubject.glossaryHeader.title).toBe('Bakker & Toledo Holding B.V.');
            expect(detail.kadastraalSubject.glossaryHeader.subtitle).toBe('Kadastraal subject');

            expect(detail.kadastraalSubjectRecht.isPresent).toBe(true);
            expect(detail.kadastraalSubjectRecht.listCount).toBe(1);
            expect(detail.kadastraalSubjectRecht.list(0).text).toBe('OZN00C03755A0008 - Eigendom (recht van) (1/1)');

            dp.logout();
        });
    });
});
