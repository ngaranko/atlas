import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';

const MapDetailNapPeilmerk = ({ panoUrl, result }) => (
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
        <h1 className="map-detail-result__header-title">NAP Peilmerk</h1>
        <h2 className="map-detail-result__header-subtitle">{result.peilmerkidentificatie}</h2>
      </div>
    </header>
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Hoogte NAP"
        value={(result.hoogte_nap || result.hoogte_nap === 0) && `${result.hoogte_nap} m`}
      />
      <MapDetailResultItem
        label="Jaar"
        value={result.jaar && result.jaar.toString()}
      />
      <MapDetailResultItem
        label="Omschrijving"
        value={result.omschrijving}
      />
    </ul>
  </section>
);

MapDetailNapPeilmerk.defaultProps = {
  panoUrl: ''
};

MapDetailNapPeilmerk.propTypes = {
  panoUrl: PropTypes.string,
  result: PropTypes.object // eslint-disable-line
};

export default MapDetailNapPeilmerk;
