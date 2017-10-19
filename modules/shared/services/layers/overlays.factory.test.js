describe('The overlays factory', function () {
    let overlays;

    beforeEach(function () {
        angular.mock.module(
            'dpShared',
            function ($provide) {
                $provide.constant('OVERLAYS', {
                    SOURCES: {
                        a: {},
                        b: {},
                        c: {},
                        d: {}
                    },
                    HIERARCHY: [
                        {
                            heading: 'h1',
                            overlays: ['e', 'a']
                        },
                        {
                            heading: 'h9',
                            overlays: ['f']
                        },
                        {
                            heading: 'h2',
                            overlays: ['b', 'c']
                        }
                    ]
                });
            }
        );

        angular.mock.inject(function (_overlays_) {
            overlays = _overlays_;
        });
    });

    it('filters the overlays on the users authorization level', function () {
        expect(overlays.SOURCES).toEqual({
            a: {},
            b: {},
            c: {},
            d: {}
        });
        expect(overlays.HIERARCHY).toEqual([
            {
                heading: 'h1',
                overlays: ['a']
            },
            {
                heading: 'h2',
                overlays: ['b', 'c']
            }
        ]);
    });
});
