import { radiansToDegrees } from '../../../../src/shared/services/angle-conversion/angle-conversion';
import { setStraatbeeldOrientation } from '../../../../src/shared/ducks/straatbeeld/straatbeeld';

(function () {
    'use strict';

    angular
        .module('dpStraatbeeld')
        .factory('orientation', orientationFactory);

    orientationFactory.$inject = ['store'];

    function orientationFactory (store) {
        return {
            update: update
        };

        function update (viewer) {
            const pitch = radiansToDegrees(viewer.view().pitch());
            const fov = radiansToDegrees(viewer.view().fov());
            const heading = radiansToDegrees(viewer.view().yaw());

            store.dispatch(setStraatbeeldOrientation({
                heading,
                pitch,
                fov
            }));
        }
    }
})();
