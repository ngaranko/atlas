fdescribe('The atlas-scrollable-content directive', function () {
    var $compile,
        $rootScope;

    beforeEach(function () {
        angular.mock.module('atlas');

        angular.mock.inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    function getDirective (visibility, pageName) {
        var directive,
            element,
            scope,
            i,
            paragraph;

        element = document.createElement('div');
        element.setAttribute('atlas-scrollable-content', '');
        element.setAttribute('visibility', 'visibility');
        element.setAttribute('page-name', pageName || '');
        element.setAttribute('style', 'height: 100px; overflow-y: scroll;');

        //Insert a lot of dummy content to enable scrolling
        for (i = 0; i < 100; i++) {
            paragraph = document.createElement('p');
            paragraph.innerText = 'I am a paragraph.';

            element.appendChild(paragraph);
        }

        scope = $rootScope.$new();
        scope.visibility = visibility;

        directive = $compile(element)(scope);
        scope.$apply();

        document.body.appendChild(element);

        return directive;
    }

    it('resets the scrollTop property whenever the active component changes', function () {
        var directive,
            visibility,
            pageName;

        visibility = {
            page: false,
            detail: true,
            searchResults: false,
            dataSelection: false
        };

        directive = getDirective(visibility, pageName);
        expect(directive[0].scrollTop).toBe(0);

        //Now scroll down
        directive[0].scrollTop = 100;

        //Show another component
        visibility.detail = false;
        visibility.page = true;
        pageName = 'home';
        $rootScope.$apply();

        //Make sure the scrollTop has been reset
        expect(directive[0].scrollTop).toBe(0);
    });
});