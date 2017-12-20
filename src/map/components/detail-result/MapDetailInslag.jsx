import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';

const MapDetailInslag = ({ panoUrl, result }) => (
  <section className="map-detail-result">
    <header
      className={`
        map-detail-result__header
        map-detail-result__header--${panoUrl ? 'pano' : 'no-pano'}
      `}
    >
      {panoUrl && (
        <img
          alt="Panoramabeeld"
          className="map-detail-result__header-pano"
          src={panoUrl}
        />
      )}
      <div className="map-detail-result__header-container">
        <h1 className="map-detail-result__header-title">Inslag</h1>
        <h2 className="map-detail-result__header-subtitle">{result._display}</h2>
      </div>
    </header>
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Datum van inslag"
        value={result.datum_inslag}
      />
      <MapDetailResultItem
        label="Soort handeling"
        value={result.type}
      />
      <MapDetailResultItem
        label="Bron"
        value={result.bron}
      />
    </ul>
  </section>
);

MapDetailInslag.defaultProps = {
  panoUrl: ''
};

MapDetailInslag.propTypes = {
  panoUrl: PropTypes.string,
  result: PropTypes.object // eslint-disable-line
};

export default MapDetailInslag;
