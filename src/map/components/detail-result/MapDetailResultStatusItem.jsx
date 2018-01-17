import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultStatusItem = ({ label, value, status }) => value && (
  <div className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">{label}</div>
      <div className={`map-detail-result__item-value ${status && status.length ? `map-detail-result__item-value--${status}` : ''}`}>{value}</div>
    </section>
  </div>
);

MapDetailResultStatusItem.defaultProps = {
  value: '',
  status: ''
};

MapDetailResultStatusItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  status: PropTypes.string
};

export default MapDetailResultStatusItem;
