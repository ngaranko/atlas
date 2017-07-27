describe('The dpDetailDocumentTitle factory', () => {
    let documentTitle;

    beforeEach(() => {
        angular.mock.module(
            'dpDetail',
            ($provide) => {
                $provide.constant('GLOSSARY', {
                    DEFINITIONS: {
                        BEPERKING: {
                            label_singular: 'Gemeentelijke beperking'
                        }
                    }
                });
            }
        );

        angular.mock.inject((dpDetailDocumentTitle) => {
            documentTitle = dpDetailDocumentTitle;
        });
    });

    it('combines a GLOSSARY label with a specific display variable', () => {
        const mockedDetailState = {
            endpoint: 'http://api.example.com/wkpb/beperking/123/',
            display: 'Een beperking'
        };
        expect(documentTitle.getTitle(mockedDetailState)).toBe('Gemeentelijke beperking: Een beperking');
    });

    it('falls back to glossary key when no definition can be found', () => {
        const mockedDetailState = {
            endpoint: 'http://api.example.com/wkpb/unknown/123/',
            display: 'display'
        };
        expect(documentTitle.getTitle(mockedDetailState)).toBe('UNKNOWN: display');
    });
});
