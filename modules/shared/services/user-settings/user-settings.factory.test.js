describe('the user settings factory', function () {
    let userSettings,
        storage;

    beforeEach(function () {
        var storageMethods = {
            setItem: angular.noop,
            getItem: angular.noop,
            removeItem: angular.noop
        };

        angular.mock.module(
            'dpShared',
            {
                storage: {
                    instance: angular.copy(storageMethods),
                    session: angular.copy(storageMethods),
                    local: angular.copy(storageMethods)
                }
            }
        );

        angular.mock.inject(function (_userSettings_, _storage_) {
            userSettings = _userSettings_;
            storage = _storage_;
        });

        [storage.instance, storage.session, storage.local]
            .forEach(s => ['setItem', 'getItem', 'removeItem']
                .forEach(m => spyOn(s, m)
            ));
    });

    it('stores token in the session storage', function () {
        userSettings.setItem('token', 'aap');
        expect(storage.session.setItem).toHaveBeenCalledWith('token', 'aap');
        userSettings.getItem('token');
        expect(storage.session.getItem).toHaveBeenCalledWith('token');
        userSettings.removeItem('token');
        expect(storage.session.removeItem).toHaveBeenCalledWith('token');
    });

    it('stores fullscreenStraatbeeld in the local storage', function () {
        userSettings.setItem('fullscreenStraatbeeld', 'aap');
        expect(storage.local.setItem).toHaveBeenCalledWith('fullscreenStraatbeeld', 'aap');
        userSettings.getItem('fullscreenStraatbeeld');
        expect(storage.local.getItem).toHaveBeenCalledWith('fullscreenStraatbeeld');
        userSettings.removeItem('fullscreenStraatbeeld');
        expect(storage.local.removeItem).toHaveBeenCalledWith('fullscreenStraatbeeld');
    });

    it('does not store unknown settings', function () {
        [storage.instance, storage.session, storage.local].forEach(s => {
            userSettings.setItem('xyz', 'aap');
            expect(s.setItem).not.toHaveBeenCalled();
            userSettings.getItem('xyz');
            expect(s.getItem).not.toHaveBeenCalled();
            userSettings.removeItem('xyz');
            expect(s.removeItem).not.toHaveBeenCalled();
        });
    });
});
