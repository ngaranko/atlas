describe('The dp-data-selection-list-header component', function () {
    var $rootScope,
        $compile,
        $q,
        dataSelectionApi,
        mockedState,
        mockedApiData;

    beforeEach(function () {
        angular.mock.module(
            'dpDataSelection',
            {
                dataSelectionApi: {
                    query: function () {
                        var q = $q.defer();

                        q.resolve(mockedApiData);

                        return q.promise;
                    }
                },
                dataSelectionConfig: {
                    zwembaden: {
                        FILTERS: [{
                            slug: 'type',
                            label: 'Type',
                            format: undefined
                        }, {
                            slug: 'regio',
                            label: 'Regio',
                            format: undefined
                        }]
                    }
                }
            },
            function ($provide) {
                $provide.factory('dpLoadingIdicatorDirective', function () {
                    return {};
                });
            }
        );

        angular.mock.inject(function (_$rootScope_, _$compile_, _$q_, _dataSelectionApi_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $q = _$q_;
            dataSelectionApi = _dataSelectionApi_;
        });

        mockedState = {
            dataset: 'zwembaden',
            filters: {
                type: 'Buitenbad'
            },
            page: 2
        };

        mockedApiData = {
            number_of_pages: 7,
            number_of_records: 77,
            filters: 'MOCKED_FILTER_DATA',
            tableData: 'MOCKED_TABLE_DATA',
            listData: 'MOCKED_LIST_DATA'
        };

        spyOn(dataSelectionApi, 'query').and.callThrough();
    });

    function getComponent (state, numberOfRecords) {
        var component,
            element,
            scope;

        element = document.createElement('dp-data-selection-list-header');
        element.setAttribute('state', 'state');
        element.setAttribute('number-of-records', 'numberOfRecords');

        scope = $rootScope.$new();
        scope.state = state;
        scope.numberOfRecords = numberOfRecords;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('shows a message with nr records and active filters when records are present', function () {
        var component = getComponent(mockedState, 10);

        expect(component.find('.qa-data-selection-header__no-records').length).toBe(0);

        expect(component.find('.qa-data-selection-header__with-records').length).toBe(1);
        expect(component.find('.qa-data-selection-header__with-records').text()).toContain('10');

        expect(component.find('.qa-data-selection-list-header__filters')
            .text().split(/\s+/).filter(item => item.length))
            .toEqual(['met', 'type:', 'Buitenbad']);
    });

    it('can show more than one filter', function () {
        mockedState.filters.regio = 'Centrum';
        var component = getComponent(mockedState, 10);

        expect(component.find('.qa-data-selection-list-header__filters')
            .text().split(/\s+/).filter(item => item.length))
            .toEqual(['met', 'type:', 'Buitenbad', 'en', 'regio:', 'Centrum']);
    });

    it('can have no filters active', function () {
        delete mockedState.filters.type;
        var component = getComponent(mockedState, 10);

        expect(component.find('.qa-data-selection-list-header__filters').length).toBe(0);
    });

    it('shows an error message when no records are present', function () {
        var component = getComponent(mockedState, 0);

        expect(component.find('.qa-data-selection-header__no-records').length).toBe(1);

        expect(component.find('.qa-data-selection-header__with-records').length).toBe(0);
    });
});
