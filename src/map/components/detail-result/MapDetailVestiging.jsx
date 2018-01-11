import React from 'react';
import PropTypes from 'prop-types';

import MapDetailAddressItem from './MapDetailAddressItem';
import MapDetailResultItem from './MapDetailResultItem';
import MapDetailResultWrapper from './MapDetailResultWrapper';
import MapDetailVestigingActiviteitenItem from './MapDetailVestigingActiviteitenItem';
import MapDetailVestigingBijzondereRechtstoestand from './MapDetailVestigingBijzondereRechtstoestand';
import Notification from '../../../shared/components/notification/Notification';

const MapDetailVestiging = ({ panoUrl, vestiging }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    subTitle={vestiging.label}
    title="Vestiging"
  >
    {vestiging.label ? (
      <ul className="map-detail-result__list">
        <MapDetailResultItem
          label="KvK-nummer"
          value={vestiging.kvkNumber}
        />
        <MapDetailAddressItem
          label="Bezoekadres"
          values={vestiging.visitingAddress}
        />
        <MapDetailVestigingActiviteitenItem activities={vestiging.activities} />
        <MapDetailVestigingBijzondereRechtstoestand
          values={vestiging.bijzondereRechtstoestand}
        />
      </ul>
    ) : (
      <Notification>
        Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om
        maatschappelijke activiteiten en vestigingen te bekijken.
      </Notification>
    )}
  </MapDetailResultWrapper>
);

MapDetailVestiging.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  vestiging: PropTypes.shape({
    activities: PropTypes.array,
    bijzondereRechtstoestand: PropTypes.object,
    kvkNumber: PropTypes.string,
    label: PropTypes.string,
    visitingAddress: PropTypes.object
  }).isRequired
};

export default MapDetailVestiging;
