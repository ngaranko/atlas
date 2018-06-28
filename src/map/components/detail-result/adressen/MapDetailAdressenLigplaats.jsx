import React from 'react';
import PropTypes from 'prop-types';

import MapDetailResultItem from '../MapDetailResultItem';
import MapDetailResultStatusItem from '../MapDetailResultStatusItem';
import MapDetailResultWrapper from '../MapDetailResultWrapper';
import Notification from '../../../../shared/components/notification/Notification';

const MapDetailAdressenLigplaats = ({
  panoUrl,
  ligplaats,
  onMaximize,
  onPanoPreviewClick
}) => (
  <MapDetailResultWrapper
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    panoUrl={panoUrl}
    subTitle={ligplaats.label}
    title="Ligplaats"
  >
    <ul className="map-detail-result__list">
      {ligplaats.indicatieGeconstateerd && <li>
        <Notification level="alert">Geconstateerd</Notification>
      </li>}
      {ligplaats.aanduidingInOnderzoek && <li>
        <Notification level="alert">In onderzoek</Notification>
      </li>}
      <MapDetailResultStatusItem
        label="Indicatie geconstateerd"
        value={ligplaats.indicatieGeconstateerd ? 'Ja' : 'Nee'}
        status={ligplaats.indicatieGeconstateerd ? 'alert' : ''}
      />
      <MapDetailResultItem
        label="Status"
        value={ligplaats.status.description}
      />
      <MapDetailResultStatusItem
        label="Aanduiding in onderzoek"
        value={ligplaats.aanduidingInOnderzoek ? 'Ja' : 'Nee'}
        status={ligplaats.aanduidingInOnderzoek ? 'alert' : ''}
      />
    </ul>
  </MapDetailResultWrapper>
);

MapDetailAdressenLigplaats.propTypes = {
  ligplaats: PropTypes.shape({
    aanduidingInOnderzoek: PropTypes.boolean,
    indicatieGeconstateerd: PropTypes.boolean,
    label: PropTypes.string,
    status: PropTypes.shape({
      description: PropTypes.string,
      code: PropTypes.string
    }).isRequired
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired
};

export default MapDetailAdressenLigplaats;
