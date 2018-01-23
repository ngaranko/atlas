import React from 'react';
import PropTypes from 'prop-types';

import ArrowRightIcon from '../../../../public/images/icon-arrow-right.svg';

const MapSearchResultsItem = ({ label, onClick, statusDescription }) => (
  <li className="map-search-results__item">
    <button
      className="map-search-results__item-button"
      onClick={onClick}
    >
      <section className="map-search-results__item-content">
        <div className="map-search-results__item-name">{label} </div>
        { statusDescription && statusDescription.length > 1 ? (
          <div className="map-search-results__item-status">
            {`${statusDescription}`}
          </div>
          ) : ''
        }
      </section>
      <ArrowRightIcon className="map-search-results__item-arrow" />
    </button>
  </li>
);

MapSearchResultsItem.defaultProps = {
  statusDescription: ''
};

MapSearchResultsItem.propTypes = {
  label: PropTypes.string.isRequired,
  statusDescription: PropTypes.string,
  onClick: PropTypes.func // eslint-disable-line
};

export default MapSearchResultsItem;
