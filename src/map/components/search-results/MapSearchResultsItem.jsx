import React from 'react';
import PropTypes from 'prop-types';

import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const MapSearchResultsItem = ({ categoryLabel, label, onClick }) => (
  <button
    className="map-search-results__item"
    onClick={onClick}
  >
    <section className="map-search-results__item-content">
      <div className="map-search-results__item-category">{categoryLabel}</div>
      <div className="map-search-results__item-name">{label}</div>
    </section>
    <ArrowRightIcon className="map-search-results__item-arrow" />
  </button>
);

MapSearchResultsItem.propTypes = {
  categoryLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func // eslint-disable-line
};

export default MapSearchResultsItem;
