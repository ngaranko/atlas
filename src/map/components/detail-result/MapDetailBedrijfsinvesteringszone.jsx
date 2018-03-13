import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';

const MapDetailBedrijfsinvesteringszone = ({
  panoUrl,
  bedrijfsinvesteringszone,
  onMaximize,
  onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={bedrijfsinvesteringszone.label}
    title="Bedrijfsinvesteringszone"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem
        label="Naam"
        value={bedrijfsinvesteringszone.name}
      />
      <MapDetailResultItem
        label="Type"
        value={bedrijfsinvesteringszone.type}
      />
      <MapDetailResultItem
        label="Heffingsgrondslag"
        value={bedrijfsinvesteringszone.heffingsgrondslag}
      />
      <MapDetailResultItem
        label="Jaarlijks opgehaald bedrag"
        value={bedrijfsinvesteringszone.heffing}
      />
      <MapDetailResultItem
        label="Aantal heffingsplichtigen"
        value={`${bedrijfsinvesteringszone.heffingsplichtigen}`}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailBedrijfsinvesteringszone.propTypes = {
  bedrijfsinvesteringszone: PropTypes.shape({
    heffing: PropTypes.string,
    heffingsgrondslag: PropTypes.string,
    heffingsplichtigen: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailBedrijfsinvesteringszone;
