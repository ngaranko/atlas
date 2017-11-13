import React from 'react';
import PropTypes from 'prop-types';

const MapResultsItem = ({ item }) => (
  <section className="map-results__item">
    <div className="map-results__item-category">{item.categoryLabel}</div>
    <div className="map-results__item-name">{item.label}</div>
  </section>
);

MapResultsItem.propTypes = {
  item: PropTypes.object // eslint-disable-line
};

export default MapResultsItem;
