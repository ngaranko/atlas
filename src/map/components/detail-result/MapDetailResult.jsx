import React from 'react';
import PropTypes from 'prop-types';

import MapDetailKadastraalObject from './MapDetailKadastraalObject';

const componentsByEndpointType = [
  'brk/object'
  // 'gebieden/bouwblok', // Bouwblok
  // 'handelsregister/vestiging', // Vestiging
  // 'meetbouten/meetbout', // Meetbout
  // 'milieuthemas/explosieven/inslagen', // Inslag
  // 'monumenten/monumenten', // Monument
  // 'nap/peilmerk' // NAP Peilmerk
];

const MapDetailResult = ({ endpoint, panoUrl, result }) => {
  const endpointType = componentsByEndpointType.find((type) => endpoint.includes(type));

  switch (endpointType) {
    case 'brk/object':
      return (
        <MapDetailKadastraalObject
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
