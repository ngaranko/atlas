describe('The overlays factory', function () {
    let $rootScope,
        overlays,
        userAuthLevel;

    beforeEach(function () {
        userAuthLevel = 0;

        angular.mock.module(
            'dpShared',
            {
                user: {
                    meetsRequiredLevel: level => level >= userAuthLevel,
                    getAuthorizationLevel: () => userAuthLevel
                }
            },
            function ($provide) {
                $provide.constant('OVERLAYS', {
                    SOURCES: {
                        a: {},
                        b: {
                            authorizationLevel: -1
                        },
                        c: {
                            authorizationLevel: 0
                        },
                        d: {
                            authorizationLevel: 1
                        }
                    },
                    HIERARCHY: [
                        {
                            heading: 'h1',
                            overlays: ['a']
                        },
                        {
                            heading: 'h2',
                            overlays: ['b', 'c']
                        }
                    ]
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _overlays_) {
            $rootScope = _$rootScope_;
            overlays = _overlays_;
        });
    });

    it('filters the overlays on the users authorization level', function () {
        expect(overlays.SOURCES).toEqual({
            c: {
                authorizationLevel: 0
            },
            d: {
                authorizationLevel: 1
            }
        });
        expect(overlays.HIERARCHY).toEqual([
            {
                heading: 'h2',
                overlays: ['c']
            }
        ]);
    });

    it('recreates the overlays on change of user\'s authorization level', function () {
        userAuthLevel = 1;
        $rootScope.$digest();

        expect(overlays.SOURCES).toEqual({
            d: {
                authorizationLevel: 1
            }
        });
        expect(overlays.HIERARCHY).toEqual(
            []
        );
    });
});
