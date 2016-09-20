describe('The atlas-search-results-header component', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('atlasSearchResults');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getComponent (numberOfResults, query, location, category) {
        var component,
            element,
            scope;

        element = document.createElement('atlas-search-results-header');
        element.setAttribute('number-of-results', 'numberOfResults');
        element.setAttribute('query', query);
        element.setAttribute('location', 'location');
        element.setAttribute('category', category);

        scope = $rootScope.$new();
        scope.numberOfResults = numberOfResults;
        scope.location = location;

        component = $compile(element)(scope);
        scope.$apply();

        return component;
    }

    it('can show the number of search results when searching with a query', function () {

    });

    it('can show the number of search results when searching by location', function () {

    });

    it('can show the number of search results for a specific category (query search only)', function () {

    });

    it('shows a message when no results have been found', function () {

    });

    it('differentiates between one or more search results (resultaat vs. resultaten)', function () {
        //When searching by query (1 result)
        //When searching by query (> 1 results)
        //When searching by location (1 result)
        //When searching by location (> 1 results)
    });

    it('uses a thousands separator for the number of search results', function () {
        //When searching by query
        //When searching by location
        //When viewing a category of search results
    });
});