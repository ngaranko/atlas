module.exports = {
    isActive: function (mainComponent) {
        return function () {
            return mainComponent.isPresent()
        };
    },
    isVisible: function (mainComponent) {
        return function () {
            return mainComponent.getAttribute('class').then(function (className) {
                return className.match(/ng-hide/) === null;
            });
        };
    }
};
