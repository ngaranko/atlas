describe('The dp-embed-button component', () => {
    let $compile,
        $rootScope,
        embed,
        store,
        scope,
        mockState;

    beforeEach(() => {
        angular.mock.module(
            'dpMap',
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
    });

    function getComponent () {
        var component,
            element;

        element = document.createElement('dp-embed-button');

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('subscribes to the store to listen for changes', () => {
        getComponent();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it('updates the link to atlas', () => {
        const component = getComponent();

        expect(component.find('.qa-embed-button').attr('href')).toBe('123');

        expect(embed.getLink).toHaveBeenCalled();
    });
});
