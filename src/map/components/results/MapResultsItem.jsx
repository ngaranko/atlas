import React from 'react';
import PropTypes from 'prop-types';

import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const MapResultsItem = ({ item }) => (
  <button className="map-results__item">
    <section className="map-results__item-content">
      <div className="map-results__item-category">{item.categoryLabel}</div>
      <div className="map-results__item-name">{item.label}</div>
    </section>
    <ArrowRightIcon className="map-results__item-arrow" />
  </button>
);

MapResultsItem.propTypes = {
  item: PropTypes.object // eslint-disable-line
};

export default MapResultsItem;
