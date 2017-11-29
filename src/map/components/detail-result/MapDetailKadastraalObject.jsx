import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';

const MapDetailKadastraalObject = ({ panoUrl, result }) => {
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
          <h1 className="map-search-results__header-title">Kadastraal object</h1>
          <h2 className="map-search-results__header-subtitle">{result._display}</h2>
        </div>
      </header>
      <ul className="map-search-results__list">
        <MapDetailResultItem
          label="Objectnummer"
          value={result.objectnummer}
        />
        {result.kadastrale_gemeente && (
          <MapDetailResultItem
            label="Kadastrale gemeente"
            value={`${result.kadastrale_gemeente._display}: ${result.kadastrale_gemeente.naam}`}
          />
        )}
        <MapDetailResultItem
          label="Grootte"
          value={`${result.grootte} m²`}
        />
      </ul>
    </section>
  );
};

MapDetailKadastraalObject.defaultProps = {
  panoUrl: ''
};

MapDetailKadastraalObject.propTypes = {
  panoUrl: PropTypes.string,
  result: PropTypes.object // eslint-disable-line
};

export default MapDetailKadastraalObject;
