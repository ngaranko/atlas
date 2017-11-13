import React from 'react';
import PropTypes from 'prop-types';

import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';
import MapResultsItem from './MapResultsItem';

const MapResults = ({ count, location, results, panoUrl }) => {
  const rdCoordinates = wgs84ToRd(location)
    .map((coordinate) => coordinate.toFixed(2));

  return (
    <section className="map-results">
      <header
        className={`
          map-results__header
          ${!panoUrl && 'map-results__header--no-pano'}
        `}
      >
        {
          panoUrl &&
          <img
            className="map-results__header-pano"
            src={panoUrl}
            alt="Panoramabeeld"
          />
        }
        <div className="map-results__header-container">
          <h1 className="map-results__header-title">Resultaten ({count})</h1>
          <h2 className="map-results__header-subtitle">
            locatie {rdCoordinates[0]}, {rdCoordinates[1]}
          </h2>
        </div>
      </header>
      <ul className="map-results__list">
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
