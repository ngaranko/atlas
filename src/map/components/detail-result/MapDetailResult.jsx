import React from 'react';
import PropTypes from 'prop-types';

import MapDetailKadastraalObject from './MapDetailKadastraalObject';
import MapDetailBouwblok from './MapDetailBouwblok';
import MapDetailMeetbout from './MapDetailMeetbout';
import MapDetailNapPeilmerk from './MapDetailNapPeilmerk';
import MapDetailInslag from './MapDetailInslag';

const endpointTypes = [
  'brk/object', // Kadastraal object
  'gebieden/bouwblok', // Bouwblok
  // 'handelsregister/vestiging', // Vestiging
  'meetbouten/meetbout', // Meetbout
  'milieuthemas/explosieven/inslagen', // Inslag
  // 'monumenten/monumenten', // Monument
  'nap/peilmerk' // NAP Peilmerk
];

const MapDetailResult = ({ endpoint, panoUrl, result }) => {
  const endpointType = endpointTypes.find((type) => endpoint.includes(type));

  switch (endpointType) {
    case 'brk/object':
      return (
        <MapDetailKadastraalObject
          panoUrl={panoUrl}
          result={result}
        />
      );
    case 'gebieden/bouwblok':
      return (
        <MapDetailBouwblok
          panoUrl={panoUrl}
          result={result}
        />
      );
    case 'meetbouten/meetbout':
      return (
        <MapDetailMeetbout
          panoUrl={panoUrl}
          result={result}
        />
      );
    case 'nap/peilmerk':
      return (
        <MapDetailNapPeilmerk
          panoUrl={panoUrl}
          result={result}
        />
      );
    case 'milieuthemas/explosieven/inslagen':
      return (
        <MapDetailInslag
          panoUrl={panoUrl}
          result={result}
        />
      );
    default:
      return '';
  }
};

MapDetailResult.defaultProps = {
  panoUrl: ''
};

MapDetailResult.propTypes = {
  endpoint: PropTypes.string.isRequired,
  panoUrl: PropTypes.string,
  result: PropTypes.object // eslint-disable-line
};

export default MapDetailResult;
