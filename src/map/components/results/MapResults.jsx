import React from 'react';
import PropTypes from 'prop-types';
import geoSearchConfig from '../../services/map-geo-search-config';
import { wgs84ToRd } from '../../../shared/services/coordinate-reference-system';

const MapResultsItem = ({ item }) => {
  const category = geoSearchConfig.categoriesByFeature[item.type].label_singular;

  return (
    <section className="map-results__item">
      <div className="map-results__item-category">{category}</div>
      <div className="map-results__item-name">{item.display}</div>
    </section>
  );
};

const MapResults = ({ count, location, results, panoUrl }) => {
  const rdCoordinates = wgs84ToRd(location)
    .map((coordinate) => coordinate.toFixed(2));

  return (
    <section className="map-results">
      <img className="map-results__pano" src={panoUrl} />
      <header className="map-results__header">
        <h1 className="map-results__header-title">Resultaten ({count})</h1>
        <h2 className="map-results__header-subtitle">locatie {rdCoordinates[0]}, {rdCoordinates[1]}</h2>
      </header>
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
