describe('The dpPageDocumentTitle factory', function () {
    var documentTitle,
        mocks = {
            pageName: angular.noop
        };

    beforeEach(function () {
        spyOn(mocks, 'pageName');

        angular.mock.module('dpPage', mocks);

        angular.mock.inject(function (dpPageDocumentTitle) {
            documentTitle = dpPageDocumentTitle;
        });
    });

    it('uses the pageName service', function () {
        documentTitle.getTitle({ name: 'pageA' });
        documentTitle.getTitle({ name: 'page-b' });

        expect(mocks.pageName).toHaveBeenCalledWith('pageA');
        expect(mocks.pageName).toHaveBeenCalledWith('page-b');
    });

    it('uses the pageState type if available', function () {
        documentTitle.getTitle({ name: 'pageA', type: 'pageAtype' });
        documentTitle.getTitle({ name: 'page-b', type: 'page-b-type' });

        expect(mocks.pageName).toHaveBeenCalledWith('pageAtype');
        expect(mocks.pageName).toHaveBeenCalledWith('page-b-type');
    });
});
