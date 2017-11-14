import React from 'react';
import PropTypes from 'prop-types';

import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const MapSearchResultsItem = ({ item }) => (
  <button className="map-search-results__item">
    <section className="map-search-results__item-content">
      <div className="map-search-results__item-category">{item.categoryLabel}</div>
      <div className="map-search-results__item-name">{item.label}</div>
    </section>
    <ArrowRightIcon className="map-search-results__item-arrow" />
  </button>
);

MapSearchResultsItem.propTypes = {
  item: PropTypes.object // eslint-disable-line
};

export default MapSearchResultsItem;
