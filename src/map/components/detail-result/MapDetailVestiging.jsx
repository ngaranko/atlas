import React from 'react';
import PropTypes from 'prop-types';

import Notification from '../../../shared/components/notification/Notification';
import MapDetailResultItem from './MapDetailResultItem';
import MapDetailAddressItem from './MapDetailAddressItem';
import MapDetailVestigingActiviteitenItem from './MapDetailVestigingActiviteitenItem';
import MapDetailVestigingBijzondereRechtstoestand from './MapDetailVestigingBijzondereRechtstoestand';

const MapDetailVestiging = ({ panoUrl, result }) => (
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
        <h1 className="map-detail-result__header-title">Vestiging</h1>
        {result._display && (
          <h2 className="map-detail-result__header-subtitle">{result._display}</h2>
        )}
      </div>
    </header>
    {!result._display && (
      <Notification>
        Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om
        maatschappelijke activiteiten en vestigingen te bekijken.
      </Notification>
    )}
    {result._display && (
      <ul className="map-detail-result__list">
        <MapDetailResultItem
          label="KvK-nummer"
          value={result.kvkNummer}
        />
        <MapDetailAddressItem
          label="Bezoekadres"
          values={result.bezoekadres}
        />
        <MapDetailVestigingActiviteitenItem activiteiten={result.activiteiten} />
        <MapDetailVestigingBijzondereRechtstoestand
          values={result._bijzondere_rechts_toestand}
        />
      </ul>
    )}
  </section>
);

MapDetailVestiging.defaultProps = {
  panoUrl: ''
};

MapDetailVestiging.propTypes = {
  panoUrl: PropTypes.string,
  result: PropTypes.object // eslint-disable-line
};

export default MapDetailVestiging;
