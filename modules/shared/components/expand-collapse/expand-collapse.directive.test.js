describe('`dpExpandCollapse` directive', () => {
    let $compile;
    let $rootScope;
    let $timeout;
    let content = 'Lorem ipsum dolor sit amet.\n';

    beforeEach(module('dpShared'));

    beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$timeout_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    it('Should collapse and expand too lengthy content', () => {
        for (let i = 0; i <= 5; i++) {
            content += content;
        }

        const collapsedElement = $compile(`<p dp-expand-collapse>${content}</p>`)($rootScope);

        collapsedElement.css({
            'max-height': '50px',
            overflow: 'hidden'
        });

        angular.element(document).find('body').append(collapsedElement);

        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        const button = angular.element(document).find('body').find('button');

        expect(button).not.toBeUndefined();
        expect(collapsedElement.scope().collapsed).toBeTruthy();

        button.click();

        expect(collapsedElement.scope().collapsed).toBeFalsy();

        button.click();

        expect(collapsedElement.scope().collapsed).toBeTruthy();
    });

    it('Should leave non-lengthy content', () => {
        const untouchedElement = $compile(`<p dp-expand-collapse>${content}</p>`)($rootScope);

        angular.element(document).find('body').append(untouchedElement);

        $timeout.flush();
        $timeout.verifyNoPendingTasks();

        expect(untouchedElement.scope().collapsed).toBeUndefined();
    });
});
