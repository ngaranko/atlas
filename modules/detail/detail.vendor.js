/* globals d3, BBGA */

import 'imports-loader?d3!bbga_visualisatie_d3/bbga';
import * as d3 from 'd3';

const BBGA = window.BBGA;

(function () {
    'use strict';

    angular
        .module('dpDetail')
        .config(configuration);

    configuration.$inject = ['$provide'];

    function configuration ($provide) {
        $provide.constant('BBGA', BBGA);
        $provide.constant('d3', d3);
    }
})();
