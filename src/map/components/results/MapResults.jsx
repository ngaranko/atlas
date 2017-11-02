import React from 'react';
import PropTypes from 'prop-types';
import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';

const MapResultsItem = ({ item }) => (
  <div>{item.display}</div>
);

const MapResults = ({ count, location, results, panoUrl }) => {
  const rdCoordinates = wgs84ToRd(location)
    .map((coordinate) => coordinate.toFixed(2));

  return (
    <section className="map-results">
      <div className="map-results__title">Resultaten ({count})</div>
      <div className="map-results__title">locatie {rdCoordinates[0]}, {rdCoordinates[1]}</div>
      <img src={panoUrl} />
      <ul>
        {results.map((result) => (
          <li key={result.uri}>
            <MapResultsItem item={result} />
          </li>
        ))}
      </ul>
    </section>
  );
};

MapResults.propTypes = {
  count: PropTypes.number, // eslint-disable-line
  location: PropTypes.array, // eslint-disable-line
  results: PropTypes.array, // eslint-disable-line
  panoUrl: PropTypes.string // eslint-disable-line
};

export default MapResults;
