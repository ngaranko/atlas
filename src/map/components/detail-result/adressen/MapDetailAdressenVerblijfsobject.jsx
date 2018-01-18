import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailAdressenVerblijfsobjectGebruiksdoelenItem from './MapDetailAdressenVerblijfsobjectGebruiksdoelenItem';

const statusToCssModifier = {
  18: 'alert'
};

const MapDetailAdressenVerblijfsobject = ({ panoUrl, verblijfsobject }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={verblijfsobject.label}
    title="Adres"
  >
    <ul className="map-detail-result__list">
      <MapDetailAdressenVerblijfsobjectGebruiksdoelenItem
        gebruiksdoelen={verblijfsobject.gebruiksdoelen}
      />
      <MapDetailResultItem
        label="Oppervlakte"
        value={(verblijfsobject.size || verblijfsobject.size === 0) ? `${verblijfsobject.size} m²` : ''}
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
    }),
    hoofdadres: PropTypes.shape({
      hoofdadres: PropTypes.bool
    })
  }).isRequired,
  panoUrl: PropTypes.string.isRequired
};

export default MapDetailAdressenVerblijfsobject;
