import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultWrapper from '../MapDetailResultWrapper'
import MapDetailResultItem from '../MapDetailResultItem'

const MapDetailGebiedenStadsdeel = ({ panoUrl, stadsdeel, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={stadsdeel.label}
    title="Stadsdeel"
  >
    <ul className="map-detail-result__list">
      <MapDetailResultItem label="Code" value={stadsdeel.code} />
      {stadsdeel.grex && (
        <div>
          <h4 className="map-detail-result__category-title">Grondexploitaties</h4>
          <ul className="map-detail-result__list">
            {stadsdeel.grex.totalIncomeLabel && (
              <MapDetailResultItem
                label="Totale begroting baten"
                value={stadsdeel.grex.totalIncomeLabel}
              />
            )}
            {stadsdeel.grex.totalExpenseLabel && (
              <MapDetailResultItem
                label="Totale begroting kosten"
                value={stadsdeel.grex.totalExpenseLabel}
              />
            )}
            {stadsdeel.grex.totalResultLabel && (
              <MapDetailResultItem label="Verschil" value={stadsdeel.grex.totalResultLabel} />
            )}
          </ul>
        </div>
      )}
    </ul>
  </MapDetailResultWrapper>
)

MapDetailGebiedenStadsdeel.propTypes = {
  stadsdeel: PropTypes.shape({
    label: PropTypes.string.isRequired,
    code: PropTypes.string,
  }).isRequired,
  panoUrl: PropTypes.string.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailGebiedenStadsdeel
