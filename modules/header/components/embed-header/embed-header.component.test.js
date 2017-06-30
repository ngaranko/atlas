describe('The dp-embed-header component', function () {
    var $compile,
        $rootScope,
        embed,
        store,
        mockState;

    beforeEach(function () {
        angular.mock.module(
            'dpHeader',
            {
                store: {
                    subscribe: function (callbackFn) {
                        callbackFn();
                    },
                    getState: function () {
                        return mockState;
                    }
                },
                embed: {
                    getLink: angular.noop,
                    getHtml: angular.noop
                }
            }
        );

        angular.mock.inject(function (_$compile_, _$rootScope_, _store_, _embed_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            embed = _embed_;
            store = _store_;
        });

        mockState = {
            atlas: {}
        };

        spyOn(store, 'subscribe');
        spyOn(embed, 'getLink');
        spyOn(embed, 'getHtml');
    });

    function getComponent () {
        var component,
            element,
            scope;

        element = document.createElement('dp-embed-header');

        scope = $rootScope.$new();

        component = $compile(element)(scope);
        scope.$digest();

        return component;
    }

    it('default state', function () {
        mockState.atlas.isEmbedPreview = false;

        getComponent();

        expect(store.subscribe).toHaveBeenCalledWith(jasmine.any(Function));

        expect(embed.getLink).toHaveBeenCalledWith(mockState);
        expect(embed.getHtml).toHaveBeenCalledWith(mockState);

        // embed.getLink.calls.reset();
        // mockState.atlas.isEmbedPreview = true;

        // expect(embed.getLink).toHaveBeenCalled();
    });
});
