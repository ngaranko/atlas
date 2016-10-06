describe('The dpDetail.documentTitle factory', function () {
    var documentTitle;

    beforeEach(function () {
        angular.mock.module(
            'dpDetail',
            function ($provide) {
                $provide.constant('STELSELPEDIA', {
                    DEFINITIONS: {
                        BEPERKING: {
                            label_singular: 'Gemeentelijke beperking'
                        },
                        VESTIGING: {
                            label_singular: 'Vestiging'
                        }
                    }
                });
            }
        );

        angular.mock.inject(function (dpDetail_documentTitle) {
            documentTitle = dpDetail_documentTitle;
        });
    });

    it('combines a stelselpedia label with a specific display variable', function () {
        expect(documentTitle.getTitle('http://api.example.com/wkpb/beperking/123/', 'Een beperking'))
            .toBe('Gemeentelijke beperking: Een beperking');

        expect(documentTitle.getTitle('http://api.example.com/wkpb/beperking/456/', 'Een andere beperking'))
            .toBe('Gemeentelijke beperking: Een andere beperking');

        expect(documentTitle.getTitle('http://api.example.com/handelsregister/vestiging/789/', 'Vestigingsnaam'))
            .toBe('Vestiging: Vestigingsnaam');
    });
});