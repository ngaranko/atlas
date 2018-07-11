import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import MapDetailAdressenVerblijfsobjectGebruiksdoelenItem from './MapDetailAdressenVerblijfsobjectGebruiksdoelenItem';

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
      { verblijfsobject.gebruiksdoelen && <MapDetailAdressenVerblijfsobjectGebruiksdoelenItem
        gebruiksdoelen={verblijfsobject.gebruiksdoelen}
      /> }
      <MapDetailResultItem
        label="Feitelijk gebruik"
        value={verblijfsobject.use && verblijfsobject.use.description}
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
      <MapDetailResultItem
        label="Oppervlakte"
        value={verblijfsobject.size ? `${verblijfsobject.size} m²` : 'onbekend'}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenVerblijfsobject.propTypes = {
  verblijfsobject: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    gebruiksdoelen: PropTypes.array,
    indicatieGeconstateerd: PropTypes.boolean,
    isNevenadres: PropTypes.boolean,
    label: PropTypes.string,
    size: PropTypes.number,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }),
    use: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    })
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenVerblijfsobject;
