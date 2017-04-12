const base = 1024;
const log1024 = Math.log(base);
const cutOff = 0.1 * 1024 * 1024; // 0.1 MB
const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

(function () {
    'use strict';

    angular
        .module('dpShared')
        .filter('filesize', filesizeFilter);

    filesizeFilter.$inject = ['localization'];

    function filesizeFilter (localization) {
        return (bytes) => {
            const precision = 1;
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
            if (bytes < cutOff) {
                return '< 0,1 MB';
            }

            const power = Math.log(bytes) / log1024;
            let unitPower = Math.floor(power);

            // display number in one unit higher.
            // e.g.: Change 200 KB to 0.2 MB
            if (unitPower < 2 && power - unitPower > 0.1) {
                ++unitPower;
            }

            // Do not exceed highest unit
            if (unitPower >= units.length) {
                unitPower = units.length - 1;
            }

            const unit = units[unitPower];
            const number = (bytes / Math.pow(base, unitPower)).toFixed(precision);
            return localization.toLocaleString(number, 'nl-NL') + ' ' + unit;
        };
    }
})();
