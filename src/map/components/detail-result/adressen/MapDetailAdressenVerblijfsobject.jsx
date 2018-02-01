import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailAdressenVerblijfsobjectGebruiksdoelenItem from './MapDetailAdressenVerblijfsobjectGebruiksdoelenItem';

const statusToCssModifier = {
  18: 'alert'
};

const MapDetailAdressenVerblijfsobject = ({
  panoUrl, verblijfsobject, onMaximize, onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={verblijfsobject.label}
    title="Adres"
  >
    <ul className="map-detail-result__list">
      { verblijfsobject.gebruiksdoelen && <MapDetailAdressenVerblijfsobjectGebruiksdoelenItem
        gebruiksdoelen={verblijfsobject.gebruiksdoelen}
      /> }
      <MapDetailResultItem
        label="Oppervlakte"
        value={verblijfsobject.size ? `${verblijfsobject.size} m²` : 'onbekend'}
      />
      <MapDetailResultItem
        label="Type woonobject"
        value={verblijfsobject.type}
      />
      <MapDetailResultItem
        label="Eigendomsverhouding"
        value={verblijfsobject.eigendomsverhouding}
      />
      <MapDetailResultStatusItem
        label="Indicatie hoofdadres"
        value={verblijfsobject.isNevenadres ? 'Nee' : 'Ja'}
        status={verblijfsobject.isNevenadres ? 'info' : ''}
      />
      <MapDetailResultStatusItem
        label="Status"
        value={verblijfsobject.status.description}
        status={statusToCssModifier[verblijfsobject.status.code]}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenVerblijfsobject.propTypes = {
  verblijfsobject: PropTypes.shape({
    eigendomsverhouding: PropTypes.string,
    gebruiksdoelen: PropTypes.array,
    label: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    })
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenVerblijfsobject;
