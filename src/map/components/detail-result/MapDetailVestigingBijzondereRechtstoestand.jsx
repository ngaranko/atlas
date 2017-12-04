import React from 'react';
import PropTypes from 'prop-types';

const MapDetailVestigingBijzondereRechtstoestand = ({ values }) => (
  <div className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">Soort bijzondere rechtstoestand</div>
      <div
        className={`
          map-detail-result__item-value
          ${values.faillissement || values.status === 'Voorlopig' || values.status === 'Definitief' ?
            'map-detail-result__item-value--alert' : ''}
        `}
      >
        {values.faillissement && (
          <span>Faillissement</span>
        )}
        {(values.status === 'Voorlopig' || values.status === 'Definitief') && (
          <span>Surseance van betaling</span>
        )}
      </div>
    </section>
  </div>
);

MapDetailVestigingBijzondereRechtstoestand.defaultProps = {
  values: {}
};

MapDetailVestigingBijzondereRechtstoestand.propTypes = {
  values: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

export default MapDetailVestigingBijzondereRechtstoestand;
