import React from 'react';
import PropTypes from 'prop-types';

const MapDetailResultUrlItem = ({ label, description, link }) => link && (
  <li className="map-detail-result__item">
    <section className="map-detail-result__item-content">
      <div className="map-detail-result__item-label">{label}</div>
      <div className={
        `map-detail-result__item-value
          ${link && link.length ?
          'map-detail-result__item-value--elipsis' :
          ''
        }`
      }
      >
        <a
          className={'o-btn o-btn--link'}
          href={link}
          target="_blank"
        >{description}</a>
      </div>
    </section>
  </li>
);

MapDetailResultUrlItem.defaultProps = {
  description: '',
  link: ''
};

MapDetailResultUrlItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string
};

export default MapDetailResultUrlItem;
