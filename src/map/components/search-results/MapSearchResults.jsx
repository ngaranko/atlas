import React from 'react';
import PropTypes from 'prop-types';

import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';
import MapSearchResultsItem from './MapSearchResultsItem';

const MapSearchResults = ({ count, location, results, panoUrl }) => {
  const rdCoordinates = wgs84ToRd(location);

  return (
    <section className="map-search-results">
      <header
        className={`
          map-search-results__header
          map-search-results__header--${panoUrl ? 'pano' : 'no-pano'}
        `}
      >
        {panoUrl && (
          <img
            alt="Panoramabeeld"
            className="map-search-results__header-pano"
            src={panoUrl}
          />
        )}
        <div className="map-search-results__header-container">
          <h1 className="map-search-results__header-title">Resultaten ({count})</h1>
          <h2 className="map-search-results__header-subtitle">
            locatie {rdCoordinates.x.toFixed(2)}, {rdCoordinates.y.toFixed(2)}
          </h2>
        </div>
      </header>
      <ul className="map-search-results__list">
        {results.map((result) => (
          <li key={result.uri}>
            <MapSearchResultsItem item={result} />
          </li>
        ))}
      </ul>
    </section>
  );
};

MapSearchResults.propTypes = {
  count: PropTypes.number, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  panoUrl: PropTypes.string, // eslint-disable-line
  results: PropTypes.array // eslint-disable-line
};

export default MapSearchResults;
