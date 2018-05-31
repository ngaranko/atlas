import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailKadastraalObject = ({
  panoUrl, kadastraalObject, onMaximize, onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={kadastraalObject.label}
    title="Kadastraal object"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Objectnummer"
        value={kadastraalObject.objectNumber}
      />
      {kadastraalObject.kadastraleGemeente && (
        <MapDetailResultItem
          label="Kadastrale gemeente"
          value={`${kadastraalObject.kadastraleGemeente.label}: ${kadastraalObject.kadastraleGemeente.name}`}
        />
      )}
      <MapDetailResultItem
        label="Grootte"
        value={(kadastraalObject.size || kadastraalObject.size === 0) ? `${kadastraalObject.size} m²` : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailKadastraalObject.propTypes = {
  kadastraalObject: PropTypes.shape({
    kadastraleGemeente: PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string
    }),
    label: PropTypes.string,
    objectNumber: PropTypes.string,
    size: PropTypes.number
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailKadastraalObject;
