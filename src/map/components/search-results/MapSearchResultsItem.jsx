import React from 'react';
import PropTypes from 'prop-types';

import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const MapSearchResultsItem = ({ label, onClick, statusLabel }) => (
  <li className="map-search-results__item">
    <button
      className="map-search-results__item-button"
      onClick={onClick}
      title={label}
    >
      <section className="map-search-results__item-content">
        <div className="map-search-results__item-name">{label}</div>
        { statusLabel && statusLabel.length > 1 ? (
          <div className="map-search-results__item-status">
            {statusLabel.toLowerCase()}
          </div>
          ) : ''
        }
      </section>
      <ArrowRightIcon className="map-search-results__item-arrow" />
    </button>
  </li>
);

MapSearchResultsItem.defaultProps = {
  statusLabel: ''
};

MapSearchResultsItem.propTypes = {
  label: PropTypes.string.isRequired,
  statusLabel: PropTypes.string,
  onClick: PropTypes.func // eslint-disable-line
};

export default MapSearchResultsItem;
