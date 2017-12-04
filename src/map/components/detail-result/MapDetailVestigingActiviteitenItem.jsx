import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultItem = ({ activiteiten }) => (
  <div className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">SBI-activiteiten</div>
      <ul className="map-detail-result__item-value map-detail-result__item-list">
        {activiteiten && activiteiten.length && activiteiten.slice(0, 5).map((activiteit) => (
          <li
            key={activiteit.sbi_code}
            className="map-detail-result__item-list-item"
          >
            {activiteit.sbi_code}: {activiteit.sbi_omschrijving}
          </li>
        ))}
      </ul>
    </section>
  </div>
);

MapDetailResultItem.defaultProps = {
  activiteiten: []
};

MapDetailResultItem.propTypes = {
  activiteiten: PropTypes.array // eslint-disable-line react/forbid-prop-types
};

export default MapDetailResultItem;
