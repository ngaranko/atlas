describe('The onMapClick factory', () => {
    var $rootScope,
        L,
        onMapClick,
        store,
        ACTIONS,
        mockedLeafletMap;

    beforeEach(() => {
        angular.mock.module(
            'dpMap',
            {
                store: {
                    getState: angular.noop,
                    subscribe: angular.noop,
                    dispatch: angular.noop
                }
            }
        );

        angular.mock.inject((_$rootScope_, _L_, _onMapClick_, _store_, _ACTIONS_) => {
            $rootScope = _$rootScope_;
            L = _L_;
            onMapClick = _onMapClick_;
            store = _store_;
            ACTIONS = _ACTIONS_;
        });

        mockedLeafletMap = L.map(document.createElement('div'));

        spyOn(store, 'dispatch');
        spyOn(store, 'getState');

        onMapClick.initialize(mockedLeafletMap);
    });

    // Mock the Leaflet click event
    function click () {
        mockedLeafletMap.fireEvent('click', {
            latlng: {
                lat: 52.124,
                lng: 4.788
            }
        });
        $rootScope.$apply();
    }

    it('dispatches an action when the map is clicked', () => {
        store.getState.and.returnValue({ map: { } });
        click();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: ACTIONS.MAP_CLICK,
            payload: [52.124, 4.788]
        });
    });

    describe('drawing mode state', () => {
        it('keeps onMapClick from dispatching an action when set to DRAW', () => {
            store.getState.and.returnValue({ map: { drawingMode: 'DRAW' } });
            click();
            expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('keeps onMapClick from dispatching an action when set to EDIT', () => {
            store.getState.and.returnValue({ map: { drawingMode: 'EDIT' } });
            click();
            expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('does not keep onMapClick from dispatching an action when set to anything but DRAW', () => {
            store.getState.and.returnValue({ map: { drawingMode: null } });
            click();
            expect(store.dispatch).toHaveBeenCalled();
        });
    });
});
