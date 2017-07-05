(function () {
    'use strict';

    beforeEach(() => {
        const Raven = {};
        const chainFn = () => Raven;

        Raven.config = chainFn;
        Raven.addPlugin = chainFn;
        Raven.install = chainFn;
        Raven.captureMessage = chainFn;

        //window.Raven = Raven;

        angular.mock.module('dpShared', { Raven });

        function RavenProvider () {
            this.$get = ['$window', function ($window) {
                return Raven;
            }];
        }
    });
})();
