describe('the storage factory', function () {
    var storage,
        keys = {},
        $windowWhitoutStorage = {
            sessionStorage: {
                getItem: function (key) {throw new Error('getItem does not work');},
                setItem: function (key, value) {keys[key] = 'no session storage';},
                removeItem: function (key) {delete keys[key];}
            }
        },
        $windowWhitStorage = {
            sessionStorage: {
                getItem: function (key) {return keys[key];},
                setItem: function (key, value) {keys[key] = value;},
                removeItem: function (key) {delete keys[key];}
            }
        };

    describe('with access to sessionStorage', function () {
        beforeEach(function () {
            angular.mock.module(
                'dpShared',
                {
                    $window: $windowWhitStorage
                }
            );
            angular.mock.inject(function (_storage_) {
                storage = _storage_;
            });
        });

        it('can set and get an item from the storage', function () {
            ['instance', 'session', 'local'].forEach(s => {
                storage[s].setItem('key', 'value');
                let data = storage[s].getItem('key');

                expect(data).toBe('value');
            });
        });

        it('can delete an item from the storage', function () {
            ['instance', 'session', 'local'].forEach(s => {
                storage[s].setItem('key', 'value');
                storage[s].removeItem('key');
                let data = storage[s].getItem('key');

                expect(data).toBe(undefined);
            });
        });
    });

    describe('without access to sessionStorage', function () {
        beforeEach(function () {
            angular.mock.module(
                'dpShared',
                function ($provide) {
                    $provide.value('$window', $windowWhitoutStorage);
                }
            );
            angular.mock.inject(function (_storage_) {
                storage = _storage_;
            });
        });

        it('can set and get an item from the storage', function () {
            ['instance', 'session', 'local'].forEach(s => {
                storage[s].setItem('key', 'value');
                let data = storage[s].getItem('key');

                expect(data).toBe('value');
            });
        });

        it('can delete an item from the storage', function () {
            ['instance', 'session', 'local'].forEach(s => {
                storage[s].setItem('key', 'value');
                storage[s].removeItem('key');
                let data = storage[s].getItem('key');

                expect(data).toBe(undefined);
            });
        });

        it('can store variable with same names with own values in each store', function () {
            storage.session.setItem('aap', 'noot');
            storage.instance.setItem('aap', 'mies');
            storage.local.setItem('aap', 'teun');
            expect(storage.session.getItem('aap')).toBe('noot');
            expect(storage.instance.getItem('aap')).toBe('mies');
            expect(storage.local.getItem('aap')).toBe('teun');
        });
    });
});
