import React from 'react'
import PropTypes from 'prop-types'

import { maxDisplayValuesPerProperty } from '../../../services/map-detail'

const MapDetailAdressenVerblijfsobjectGebruiksdoelenItem = ({ gebruiksdoelen }) =>
  gebruiksdoelen.length > 0 && (
    <div className="map-detail-result__item">
      <section className="map-detail-result__item-content">
        <div className="map-detail-result__item-label">Gebruiksdoel</div>
        <ul className="map-detail-result__item-value map-detail-result__item-list">
          {gebruiksdoelen.slice(0, maxDisplayValuesPerProperty).map(item => (
            <li key={item.code} className="map-detail-result__item-list-item">
              {item.description}
              {item.descriptionPlus && <span>:{item.descriptionPlus}</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )

MapDetailAdressenVerblijfsobjectGebruiksdoelenItem.propTypes = {
  gebruiksdoelen: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      descriptionPlus: PropTypes.string,
    }),
  ).isRequired,
}

export default MapDetailAdressenVerblijfsobjectGebruiksdoelenItem
