(() => {
    'use strict';

    angular
        .module('dpDetail')
        .factory('dateFormatter', dateFormatterFactory);

    dateFormatterFactory.$inject = ['d3'];

    function dateFormatterFactory (d3) {
        const formatters = d3.locale({
            'decimal': ',',
            'thousands': '.',
            'grouping': [3],
            'currency': ['€', ''],
            'dateTime': '%a %b %e %X %Y',
            'date': '%d-%m-%Y',
            'time': '%H:%M:%S',
            'periods': ['AM', 'PM'],
            'days': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
            'shortDays': ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
            'months': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september',
                'oktober', 'november', 'december'],
            'shortMonths': ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
        });

        const tickFormatter = formatters.timeFormat.multi([
            ['.%L', function (d) { return d.getMilliseconds(); }],
            [':%S', function (d) { return d.getSeconds(); }],
            ['%I:%M', function (d) { return d.getMinutes(); }],
            ['%I %p', function (d) { return d.getHours(); }],
            ['%a %d', function (d) { return d.getDay() && d.getDate() !== 1; }],
            ['%b %d', function (d) { return d.getDate() !== 1; }],
            ['%b', function (d) { return d.getMonth(); }],
            ['%Y', function () { return true; }]
        ]);

        return {
            tickFormatter
        };
    }
})();
