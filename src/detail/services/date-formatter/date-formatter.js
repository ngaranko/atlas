import { locale } from 'd3';

const formatters = locale({
  decimal: ',',
  thousands: '.',
  grouping: [3],
  currency: ['€', ''],
  dateTime: '%a %b %e %X %Y',
  date: '%d-%m-%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  shortDays: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september',
    'oktober', 'november', 'december'],
  shortMonths: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
});

const tickFormatter = formatters.timeFormat.multi([
    ['.%L', (d) => d.getMilliseconds()],
    [':%S', (d) => d.getSeconds()],
    ['%I:%M', (d) => d.getMinutes()],
    ['%I %p', (d) => d.getHours()],
    ['%a %d', (d) => d.getDay() && d.getDate() !== 1],
    ['%b %d', (d) => d.getDate() !== 1],
    ['%b', (d) => d.getMonth()],
    ['%Y', () => true]
]);

export default {
  tickFormatter
};
