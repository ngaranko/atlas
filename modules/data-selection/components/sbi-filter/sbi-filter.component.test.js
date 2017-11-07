describe('The dp-sbi-filter component', () =>  {
    var $compile,
        $rootScope,
        store,
        ACTIONS,
        availableFilters;

    beforeEach(() =>  {
        angular.mock.module(
            'dpDataSelection',
            {
                store: {
                    dispatch: () =>  {}
                }
            },
            function ($provide) {
                $provide.constant('DATA_SELECTION_CONFIG', {
                    datasets: {
                        my_special_dataset: {
                            FILTERS: [
                                {
                                    slug: 'sbi_code'
                                }, {
                                    slug: 'sbi_l1'
                                }, {
                                    slug: 'sbi_l2'
                                }
                            ]
                        }
                    }
                });
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _ACTIONS_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        availableFilters = [
            {
                slug: 'sbi_code',
                label: 'SBI-code',
                options: [],
                numberOfOptions: 0
            }, {
                slug: 'sbi_l1',
                label: 'SBI-code',
                options: [
                    {
                        label: 'de eerste van level 1',
                        id: 'optie-b-1'
                    }, {
                        label: 'de tweede van level 1',
                        id: 'optie-b-2'
                    }, {
                        label: 'de derde van level 1',
                        id: 'optie-b-3'
                    }
                ],
                numberOfOptions: 3
            }, {
                slug: 'sbi_l2',
                label: 'SBI-code',
                options: [
                    {
                        count: 666,
                        label: 'Optie van het Beest'
                    }
                ],
                numberOfOptions: 1
            }
        ];

        spyOn(store, 'dispatch');
    });

    function getComponent (activeFilters = {}) {
        var component,
            element,
            scope;

        element = document.createElement('dp-sbi-filter');

        element.setAttribute('available-filters', 'availableFilters');
        element.setAttribute('active-filters', 'activeFilters');

        scope = $rootScope.$new();
        scope.availableFilters = availableFilters;
        scope.activeFilters = activeFilters;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    fit('shows the sbi filter form', () =>  {
        const component = getComponent();

        expect(component.find('.qa-sbi-filter-form-input').length).toBe(1);
        expect(component.find('.qa-sbi-filter-form-input').val()).toBe('');

        expect(component.find('.qa-sbi-filter-form-sumbit').length).toBe(1);
        expect(component.find('.qa-sbi-filter-form-sumbit').text()).toBe('Selecteer');
    });

    fit('shows the sbi filter list', () =>  {
        const component = getComponent();

        expect(component.find('.qa-sbi-filter').length).toBe(1);
        expect(component.find('.qa-sbi-filter h1').text()).toBe('');

        // sbi filter
        expect(component.find('.qa-sbi-filter h2').eq(0).text()).toBe('SBI-code');
        expect(component.find('.qa-sbi-filter ul').eq(0).find('li').length).toBe(4);

        expect(component.find('.qa-sbi-filter ul').eq(0).find('li button').eq(0).text())
            .toContain('de eerste van level 1');

        expect(component.find('.qa-sbi-filter ul').eq(0).find('li button').eq(3).text())
            .toContain('Optie van het Beest');
    });

    fit('shows the sbi filter list with maximum of 10 items', () =>  {
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].options.push({
            label: 'de xxx van level 1'
        });
        availableFilters[1].numberOfOptions = availableFilters[1].options.length;

        const component = getComponent();

        // maximum number of items
        expect(component.find('.qa-sbi-filter ul').eq(0).find('li').length).toBe(10);

        expect(component.find('.qa-show-more-button').length).toBe(1);
    });

    describe('it dispatches an action when a filter has been added', () =>  {
        it('when adding the first filter; one filter is communicated', () =>  {
            var component,
                activeFilters = {};

            component = getComponent(activeFilters, false);
            component.find('ul').eq(0).find('li').eq(1).find('button').click();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.APPLY_FILTERS,
                payload: {
                    filter_a_new: 'optie-a-2'
                }
            });
        });

        it('when adding another filter; all filters are communicated', () =>  {
            var component,
                activeFilters = {
                    filter_a_new: 'optie-a-2'
                };

            component = getComponent(activeFilters, false);
            component.find('.qa-sbi-filter ul').eq(1).find('li').eq(0).find('button').click();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.APPLY_FILTERS,
                payload: {
                    filter_a_new: 'optie-a-2',
                    filterb: 'optie-b-1'
                }
            });
        });

        it('can only have one option per filter', () =>  {
            var component,
                activeFilters = {
                    filter_a_new: 'optie-a-2',
                    filterb: 'optie-b-1'
                };

            component = getComponent(activeFilters, false);
            component.find('.qa-sbi-filter ul').eq(1).find('li').eq(1).find('button').click();

            expect(store.dispatch).toHaveBeenCalledWith({
                type: ACTIONS.APPLY_FILTERS,
                payload: {
                    filter_a_new: 'optie-a-2',
                    // filterb: 'Optie B-1' is no longer active now
                    filterb: 'optie-b-2'
                }
            });
        });
    });

    it('updates its active filters when available filters are changed', () =>  {
        var component,
            activeFilters;

        activeFilters = 'aap';
        component = getComponent(activeFilters, false);
        component.scope().activeFilters = 'noot';
        component.scope().availableFilters = null;
        component.scope().$apply();

        expect(component.scope().formattedActiveFilters).toBeUndefined();
    });

    it('can implode both known and unknown filters', () =>  {
        var component = getComponent({}, false);
        var scope = component.isolateScope();

        scope.vm.expandFilter('xyz');
        scope.vm.implodeFilter('xyz');
        expect(scope.vm.isExpandedFilter('xyz')).toBe(false);

        scope.vm.implodeFilter('abc');
        expect(scope.vm.isExpandedFilter('abc')).toBe(false);
    });

    it('shows maximum of 10 options per filter, it can expand/implode when it has more than 10 results', () =>  {
        var component;

        // When there are 10 or less available options
        component = getComponent({}, false);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('li').length).toBe(10);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('button').length).toBe(10);
        expect(component.text()).not.toContain('Toon meer');

        // When there are more than 10 options
        availableFilters[0].options.push({
            count: 117,
            label: 'Optie A-11'
        });

        availableFilters[0].options.push({
            count: 104,
            label: 'Optie A-12'
        });

        availableFilters[0].numberOfOptions = 12;

        component = getComponent({}, false);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('li').length).toBe(10);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('button').length).toBe(11);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('button').eq(10).text()).toContain('Toon meer');

        // Click the show more button
        component.find('.qa-sbi-filter > div').eq(0).find('button').click();
        $rootScope.$apply();

        expect(component.find('.qa-sbi-filter > div').eq(0).find('li').length).toBe(12);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('li button').eq(10).text())
            .toContain('Optie A-11');
        expect(component.find('.qa-sbi-filter > div').eq(0).find('li button').eq(11).text())
            .toContain('Optie A-12');

        // Make sure the show more button is gone now
        expect(component.find('.qa-sbi-filter > div').eq(0).text()).not.toContain('Toon meer');
        // Make sure the show less button is shown
        expect(component.find('.qa-sbi-filter > div').eq(0).text()).toContain('Toon minder');

        // Click the show less button
        component.find('.qa-sbi-filter > div').eq(0).find('button').click();
        $rootScope.$apply();

        // Make sure the show less button is gone now
        expect(component.find('.qa-sbi-filter > div').eq(0).text()).not.toContain('Toon minder');
        // Make sure the show more button is shown
        expect(component.find('.qa-sbi-filter > div').eq(0).text()).toContain('Toon meer');
    });

    it('expanded filters have a message when there are more options that 100', () =>  {
        // When there are less than 100 options
        var component;

        // Making sure the mocked filter has more than 10 options
        availableFilters[0].options.push({
            count: 4,
            label: 'Optie A-11'
        });

        // When there are 100 or less available options
        component = getComponent({}, false);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('.qa-hidden-options').length).toBe(0);
        component.find('.qa-sbi-filter > div').eq(0).find('.qa-show-more-button').click();
        expect(component.find('.qa-sbi-filter > div').eq(0).find('.qa-hidden-options').length).toBe(0);

        // When there are more then 100 available options: show the message after expanding the filter
        availableFilters[0].numberOfOptions = 101;
        component = getComponent({}, false);
        expect(component.find('.qa-sbi-filter > div').eq(0).find('.qa-hidden-options').length).toBe(0);
        component.find('.qa-sbi-filter > div').eq(0).find('.qa-show-more-button').click();
        expect(component.find('.qa-sbi-filter > div').eq(0).find('.qa-hidden-options').length).toBe(1);
    });
});
