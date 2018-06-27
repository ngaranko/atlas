import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailAdressenVerblijfsobjectGebruiksdoelenItem from './MapDetailAdressenVerblijfsobjectGebruiksdoelenItem';
import Notification from '../../../../shared/components/notification/Notification';

const statusToCssModifier = {
  18: 'alert',
  19: 'alert',
  20: '',
  21: '',
  22: 'alert',
  23: 'alert'
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
      { statusToCssModifier[verblijfsobject.status.code] && <li>
        <Notification level="alert">Status: {verblijfsobject.status.description}</Notification>
      </li> }
      { verblijfsobject.isNevenadres && <li>
        <Notification level="info">Dit is een nevenadres</Notification>
      </li> }
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
        label="Indicatie geconstateerd"
        value={verblijfsobject.indicatieGeconstateerd ? 'Ja' : 'Nee'}
        status={verblijfsobject.indicatieGeconstateerd ? 'alert' : ''}
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
      <MapDetailResultStatusItem
        label="Aanduiding in onderzoek"
        value={verblijfsobject.aanduidingInOnderzoek ? 'Ja' : 'Nee'}
        status={verblijfsobject.aanduidingInOnderzoek ? 'alert' : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenVerblijfsobject.propTypes = {
  verblijfsobject: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    eigendomsverhouding: PropTypes.string,
    gebruiksdoelen: PropTypes.array,
    indicatieGeconstateerd: PropTypes.boolean,
    isNevenadres: PropTypes.boolean,
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
