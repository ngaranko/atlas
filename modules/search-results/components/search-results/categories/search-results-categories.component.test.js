describe('The dp-search-results-categories component', function () {
    let $compile,
        $rootScope,
        $q,
        store,
        scope,
        element,
        search,
        geosearch,
        user,
        ACTIONS,
        mockedSearchResults,
        mockedSearchResultsNextPage,
        mockedGeosearchResults,
        mockedNoResults,
        linkSelector,
        i;

    beforeEach(function () {
        angular.mock.module(
            'dpSearchResults',
            {
                search: {
                    search: function (query) {
                        const q = $q.defer();

                        if (query === 'QUERY_WITHOUT_RESULTS') {
                            q.resolve(mockedNoResults);
                        } else {
                            q.resolve(mockedSearchResults);
                        }
                        scope.isLoading = false;
                        return q.promise;
                    },
                    loadMore: function () {
                        const q = $q.defer();

                        q.resolve(mockedSearchResultsNextPage);

                        return q.promise;
                    }
                },
                geosearch: {
                    search: function (location) {
                        const q = $q.defer();

                        if (location[0] === 52.999 && location[1] === 4.999) {
                            q.resolve(mockedNoResults);
                        } else {
                            q.resolve(mockedGeosearchResults);
                        }
                        scope.isLoading = false;
                        return q.promise;
                    }
                },
                // Store is used in the non-mocked child directive dp-link
                store: {
                    dispatch: function () {}
                }
            },
            function ($provide) {
                $provide.factory('dpStraatbeeldThumbnailDirective', function () {
                    return {};
                });

                $provide.factory('dpSearchResultsHeaderDirective', function () {
                    return {};
                });

                $provide.value('coordinatesFilter', function (input) {
                    return input.join(', ') + ' (X, Y)';
                });
            }
        );

        angular.mock.inject(function (
            _$compile_, _$rootScope_, _$q_, _store_, _search_, _geosearch_, _user_, _ACTIONS_
        ) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $q = _$q_;
            store = _store_;
            search = _search_;
            geosearch = _geosearch_;
            user = _user_;
            ACTIONS = _ACTIONS_;
        });

        mockedSearchResults = [
            {
                label_singular: 'Adres',
                label_plural: 'Adressen',
                slug: 'adres',
                count: 11,
                results: [
                    {
                        label: 'Weesperstraat 101',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864309/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 102',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918914/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 104',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918974/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630023754253/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 105',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864311/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 106',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000918975/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 111',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864313/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 112',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000919001/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 115',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864315/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 116',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000919584/',
                        subtype: 'verblijfsobject'
                    },
                    {
                        label: 'Weesperstraat 117',
                        endpoint: 'https://some-domain/bag/verblijfsobject/03630000864316/',
                        subtype: 'verblijfsobject'
                    }
                ],
                next: null
            },
            {
                label_singular: 'Openbare ruimte',
                label_plural: 'Openbare ruimtes',
                slug: 'openbare_ruimte',
                count: 1,
                results: [
                    {
                        label: 'Weesperstraat',
                        endpoint: 'https://some-domain/bag/openbareruimte/03630000004835/',
                        subtype: 'weg'
                    }
                ],
                next: null
            }
        ];
        mockedGeosearchResults = [
            {
                slug: 'pand',
                label_singular: 'Pand',
                label_plural: 'Panden',
                results: [
                    {
                        label: '03630013054429',
                        subtype: null,
                        endpoint: 'https://api.data.amsterdam.nl/bag/pand/03630013054429/'
                    }
                ],
                count: 1,
                subResults: [
                    {
                        label_singular: 'Adres',
                        label_plural: 'Adressen',
                        slug: 'adres',
                        count: 12,
                        results: [
                            {
                                label: 'Lumièrestraat 6',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023953/'
                            },
                            {
                                label: 'Lumièrestraat 8',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023954/'
                            },
                            {
                                label: 'Lumièrestraat 10',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023955/'
                            },
                            {
                                label: 'Lumièrestraat 12',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023956/'
                            },
                            {
                                label: 'Lumièrestraat 14',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023957/'
                            },
                            {
                                label: 'Lumièrestraat 16',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023958/'
                            },
                            {
                                label: 'Lumièrestraat 18',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023959/'
                            },
                            {
                                label: 'Lumièrestraat 20',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023960/'
                            },
                            {
                                label: 'Lumièrestraat 22',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023961/'
                            },
                            {
                                label: 'Lumièrestraat 24',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023962/'
                            },
                            {
                                label: 'Lumièrestraat 26',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023963/'
                            },
                            {
                                label: 'Lumièrestraat 28',
                                endpoint: 'https://api.data.amsterdam.nl/bag/verblijfsobject/03630001023964/'
                            }
                        ],
                        next: 'https://api.data.amsterdam.nl/bag/verblijfsobject/?page=2&panden__id=03630013054429',
                        more: {
                            label: 'Bekijk alle 12 adressen binnen dit pand',
                            endpoint: 'https://api.data.amsterdam.nl/bag/pand/03630013054429/'
                        }
                    }
                ]
            },
            {
                label_singular: 'Openbare ruimte',
                label_plural: 'Openbare ruimtes',
                results: [
                    {
                        label: 'Test OR #1',
                        subtype: 'landschappelijk gebied',
                        endpoint: 'https://api.data.amsterdam.nl/bag/openbareruimte/123/'
                    },
                    {
                        label: 'Test OR #2',
                        subtype: 'weg',
                        endpoint: 'https://api.data.amsterdam.nl/bag/openbareruimte/456/'
                    },
                    {
                        label: 'Test OR #3',
                        subtype: 'water',
                        endpoint: 'https://api.data.amsterdam.nl/bag/openbareruimte/789/'
                    }
                ],
                count: 3
            },
            {
                label_singular: 'Kadastraal object',
                label_plural: 'Kadastrale objecten',
                slug: 'subject',
                results: [
                    {
                        label: 'ASD41AU00154G0000',
                        subtype: null,
                        endpoint: 'https://api.data.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11820015470000/'
                    }
                ],
                count: 1
            },
            {
                label_singular: 'Gebied',
                label_plural: 'Gebieden',
                results: [
                    {
                        label: 'Haveneiland Noordoost',
                        subtype: 'buurt',
                        endpoint: 'https://api.data.amsterdam.nl/gebieden/buurt/03630023754004/'
                    },
                    {
                        label: 'IJburg West',
                        subtype: 'buurtcombinatie',
                        endpoint: 'https://api.data.amsterdam.nl/gebieden/buurtcombinatie/3630012052079/'
                    },
                    {
                        label: 'Ijburg / Eiland Zeeburg',
                        subtype: 'gebiedsgerichtwerken',
                        endpoint: 'https://api.data.amsterdam.nl/gebieden/gebiedsgerichtwerken/DX16/'
                    },
                    {
                        label: 'AW33',
                        subtype: 'bouwblok',
                        endpoint: 'https://api.data.amsterdam.nl/gebieden/bouwblok/03630012096424/'
                    },
                    {
                        label: 'Oost',
                        subtype: 'stadsdeel',
                        endpoint: 'https://api.data.amsterdam.nl/gebieden/stadsdeel/03630011872039/'
                    }
                ],
                count: 5
            }
        ];
        mockedNoResults = [];

        linkSelector = '.qa-search-result dp-link:not(dp-link-to-page dp-link)';

        spyOn(store, 'dispatch');
        spyOn(user, 'meetsRequiredLevel');
    });

    function getComponent (categories) {
        element = document.createElement('dp-search-results-categories');
        scope = $rootScope.$new();

        element.setAttribute('categories', 'categories');
        scope.categories = categories;

        const component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    fdescribe('search by query', function () {
        it('should have access to UserService for autorization', function () {
            var comp = getComponent(mockedSearchResults);
            expect(typeof comp.isolateScope().vm.meetsRequiredLevel).toBe('function');
        });

        it('shows search results', function () {
            const component = getComponent(mockedSearchResults);
            const links = component.find('.qa-list-item-link');

            // It shows 10 results from the first category and 1 results from the second category
            expect(links.length).toBe(11);

            // The first result
            expect(links.eq(0).text().trim()).toBe('Weesperstraat 101');

            // The last results from the first category
            expect(links.eq(9).text().trim()).toBe('Weesperstraat 116');

            // The last (and only) result from the second category
            expect(links.eq(10).text().trim()).toBe('Weesperstraat');
        });

        it('doesn\'t show the dp-straatbeeld-thumbnail component', function () {
            const component = getComponent(mockedSearchResults);

            expect(component.find('dp-straatbeeld-thumbnail').length).toBe(0);
        });

        describe('has category support', function () {
            it('has both singular and plural variations for the headings of categories', function () {
                let component;

                // A category with 11 search results uses the plural form and it shows the number of results in brackets
                component = getComponent(mockedSearchResults);
                expect(component.find('.qa-search-header').eq(0).text().trim()).toBe('Adressen (11)');

                // A category with 1 search result uses the singular form and doesn't show the number or results
                mockedSearchResults[0].count = 1;
                mockedSearchResults[0].results.length = 1;
                component = getComponent(mockedSearchResults);
                expect(component.find('.qa-search-header').eq(0).text().trim()).toBe('Adres');
            });

            it('has a plural heading in case only a warning is shown', function () {
                user.meetsRequiredLevel.and.returnValue(false);
                const component = getComponent(mockedGeosearchResults);
                const isolateScope = component.isolateScope();

                isolateScope.vm.categories[3].results = [];
                isolateScope.vm.categories[3].count = 0;
                isolateScope.$digest();

                const categoryNode = component.find('.qa-search-results-category').eq(3);
                expect(categoryNode.find('dp-panel').length).toBe(1);
                expect(categoryNode.find('.qa-search-header').text().trim()).toBe('Kadastrale objecten');
            });

            it('categories with more than 10 results show a link to the category', function () {
                let component;

                // A category with 11 search results uses the plural form and it shows the number of results in brackets
                component = getComponent(mockedSearchResults);
                expect(removeWhitespace(component.find(linkSelector).eq(10).text()))
                    .toBe('Toon alle 11');
                component.find(`${linkSelector} button`).click();
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: ACTIONS.FETCH_SEARCH_RESULTS_CATEGORY,
                    payload: 'adres'
                });

                // This link shows numbers with a thousand separator
                mockedSearchResults[0].count = 1234;
                component = getComponent(mockedSearchResults);
                expect(removeWhitespace(component.find(linkSelector).eq(10).text()))
                    .toBe('Toon alle 1.234');
            });
        });
    });

    describe('search by location', function () {
        let component;

        beforeEach(function () {
            component = getComponent(mockedGeosearchResults);
        });

        it('shows search results from the geosearch API on the scope', function () {
            expect(component.find('.qa-search-header').length).toBe(5);

            // 20 list items which includes only 10 adressen instead of 12
            expect(component.find('.qa-list-item-link').length).toBe(20);
            // an additional 'show more' link to Pand
            expect(component.find('.qa-show-more').length).toBe(1);

            const categories = component.find('.qa-search-results-category');
            expect(categories.length).toBe(5);

            // First category
            const first = categories.eq(0);
            // Singular, no number of results shown
            expect(first.find('.qa-search-header').eq(0).text().trim()).toBe('Pand');
            // One item, plus (the first) ten of the sub category Adressen
            expect(first.find('.qa-list-item-link').length).toBe(11);
            // The sub category Adressen has a show more link
            expect(first.find('.qa-show-more').length).toBe(1);

            // Sub categories
            const subCategories = categories.eq(0).find('.qa-search-results-category');
            expect(subCategories.length).toBe(1);

            // First sub category would be the same as `const second = categories.eq(1);`
            const sub = subCategories.eq(0);
            // Plural, with number of results
            expect(sub.find('.qa-search-header').text().trim()).toBe('Adressen (12)');
            expect(sub.find('.qa-list-item-link').length).toBe(10);

            // an additional 'show more' link to Pand
            expect(sub.find('.qa-show-more').length).toBe(1);
            expect(sub.find('.qa-show-more').text().trim()).toBe('Bekijk alle 12 adressen binnen dit pand');

            // Second category (skipping index one, that's the sub category
            // above)
            const second = categories.eq(2);
            // Plural
            expect(second.find('.qa-search-header').text().trim()).toBe('Openbare ruimtes (3)');
            expect(second.find('.qa-list-item-link').length).toBe(3);
            expect(second.find('.qa-show-more').length).toBe(0);

            // Third category
            const third = categories.eq(3);
            // Singular
            expect(third.find('.qa-search-header').text().trim()).toBe('Kadastraal object');
            expect(third.find('.qa-list-item-link').length).toBe(1);
            expect(third.find('.qa-show-more').length).toBe(0);

            // Fourth category
            const fourth = categories.eq(4);
            // Plural
            expect(fourth.find('.qa-search-header').text().trim()).toBe('Gebieden (5)');
            expect(fourth.find('.qa-list-item-link').length).toBe(5);
            expect(fourth.find('.qa-show-more').length).toBe(0);
        });
    });

    describe('the Kadastraal subject warning messages', function () {
        it('should not be shown for an employee plus', function () {
            user.meetsRequiredLevel.and.callFake(
                required => required === user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS
            );

            const component = getComponent(mockedGeosearchResults);

            const categoryNode = component.find('.qa-search-results-category').eq(3);
            expect(categoryNode.find('.qa-search-header').text().trim()).toBe('Kadastraal object');

            expect(categoryNode.find('.qa-category-warning').length).toBe(0);
        });

        it('should show a specific message for an employee users', function () {
            user.meetsRequiredLevel.and.callFake(
                required => required === user.AUTHORIZATION_LEVEL.EMPLOYEE
            );
            const component = getComponent(mockedGeosearchResults);

            const categoryNode = component.find('.qa-search-results-category').eq(3);
            expect(categoryNode.find('.qa-search-header').text().trim()).toBe('Kadastraal object');

            expect(categoryNode.find('.qa-category-warning').text()).toContain(
                'Medewerkers met speciale bevoegdheden' +
                ' kunnen alle gegevens vinden (ook natuurlijke personen).'
            );
            expect(categoryNode.find('.qa-category-warning').text()).toContain('Help > Bediening > Inloggen');
        });

        it('should show a general message for all other users', function () {
            user.meetsRequiredLevel.and.returnValue(false);
            const component = getComponent(mockedGeosearchResults);

            const categoryNode = component.find('.qa-search-results-category').eq(3);
            expect(categoryNode.find('.qa-search-header').text().trim()).toBe('Kadastraal object');

            expect(categoryNode.find('.qa-category-warning').text()).toContain(
                'Om kadastraal subjecten te kunnen vinden,' +
                ' moet je als medewerker/ketenpartner van Gemeente Amsterdam inloggen.' +
                ' Om ook natuurlijke personen te vinden, moet je als medewerker bovendien' +
                ' speciale bevoegdheden hebben.'
            );
            expect(categoryNode.find('.qa-category-warning').text()).toContain('Help > Bediening > Inloggen');
        });

        it('should update the message on authorization change', function () {
            user.meetsRequiredLevel.and.callFake(
                required => required === user.AUTHORIZATION_LEVEL.EMPLOYEE_PLUS
            );
            const component = getComponent(mockedGeosearchResults);
            const categoryNode = component.find('.qa-search-results-category').eq(3);
            expect(categoryNode.find('.qa-search-header').text().trim()).toBe('Kadastraal object');
            expect(categoryNode.find('.qa-category-warning').length).toBe(0);

            spyOn(user, 'getAuthorizationLevel').and.returnValue('foo'); // changed so $watch fires
            user.meetsRequiredLevel.and.returnValue(false);
            $rootScope.$apply();

            expect(categoryNode.find('.qa-category-warning').length).toBe(1);
        });
    });

    function removeWhitespace (input) {
        return input
            .trim()
            // Remove new line characters
            .replace(/\n/g, '')
            // Replace 2 or more spaces with a single space
            .replace(/\s{2,}/g, ' ');
    }
});
