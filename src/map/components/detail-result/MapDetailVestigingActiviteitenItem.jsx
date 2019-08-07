import React from 'react'
import PropTypes from 'prop-types'

import { maxDisplayValuesPerProperty } from '../../services/map-detail'

const MapDetailVestigingActiviteitenItem = ({ activities }) =>
  activities.length > 0 && (
    <div className="map-detail-result__item">
      <section className="map-detail-result__item-content">
        <div className="map-detail-result__item-label">SBI-code en -omschrijving</div>
        <ul className="map-detail-result__item-value map-detail-result__item-list">
          {activities.slice(0, maxDisplayValuesPerProperty).map(activity => (
            <li key={activity.sbiCode} className="map-detail-result__item-list-item">
              {`${activity.sbiCode}: ${activity.sbiDescription}`}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )

MapDetailVestigingActiviteitenItem.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      sbiCode: PropTypes.string.isRequired,
      sbiDescription: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default MapDetailVestigingActiviteitenItem
