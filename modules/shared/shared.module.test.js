/* eslint-disable angular/window-service */
window.Raven = {
    config: () => ({ addPlugin: () => ({ install: angular.noop }) }),
    Plugins: { Angular: {} }
};
angular.module('ngRaven', []).factory('Raven', () => {
    return { captureMessage: angular.noop };
});
