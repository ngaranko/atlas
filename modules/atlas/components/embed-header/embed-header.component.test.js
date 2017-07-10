describe('The dp-embed-header component', () => {
    let $compile,
        $rootScope,
        embed,
        store,
        scope,
        mockState;

    beforeEach(() => {
        angular.mock.module(
            'atlas',
            {
                store: {
                    subscribe: callbackFn => {
                        callbackFn();
                    },
                    getState: angular.noop
                },
                embed: {
                    getLink: angular.noop,
                    getHtml: angular.noop
                }
            }
        );

        angular.mock.inject((_$compile_, _$rootScope_, _store_, _embed_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            embed = _embed_;
            store = _store_;
        });

        mockState = {
            atlas: {}
        };

        spyOn(store, 'subscribe').and.callThrough();
        spyOn(store, 'getState').and.returnValue(mockState);
        spyOn(embed, 'getLink').and.returnValue('123');
        spyOn(embed, 'getHtml').and.returnValue('abc');
    });

    function getComponent () {
        var component,
            element;

        element = document.createElement('dp-embed-header');

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('subscribes to the store to listen for changes', () => {
        getComponent();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('updates the values in the form', () => {
        const component = getComponent();

        expect(component.find('.qa-embed-header-form-input-link')[0].value).toBe('123');
        expect(component.find('.qa-embed-header-form-input-html')[0].value).toBe('abc');

        expect(embed.getLink).toHaveBeenCalled();
        expect(embed.getHtml).toHaveBeenCalled();
    });
});
