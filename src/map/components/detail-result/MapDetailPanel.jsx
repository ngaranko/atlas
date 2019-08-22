import React from 'react'
import PropTypes from 'prop-types'

import MapDetailResultItem from './MapDetailResultItem'
import MapDetailResultWrapper from './MapDetailResultWrapper'
import Notification from '../../../shared/components/notification/Notification'

const MapDetailPanel = ({ panoUrl, result, onMaximize, onPanoPreviewClick }) => (
  <MapDetailResultWrapper
    panoUrl={panoUrl}
    onMaximize={onMaximize}
    onPanoPreviewClick={onPanoPreviewClick}
    subTitle={result.subTitle}
    title={result.title}
  >
    <>
      {!!result.notification && <Notification>{result.notification}</Notification>}
      <ul className="map-detail-result__list">
        {result.items.map(
          item =>
            item.value && (
              <MapDetailResultItem
                hasMultiline={!!item.multiLine}
                link={item.link ? item.link : false}
                label={item.label}
                value={item.value}
              />
            ),
        )}
      </ul>
    </>
  </MapDetailResultWrapper>
)

MapDetailPanel.propTypes = {
  panoUrl: PropTypes.string.isRequired,
  result: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
}

export default MapDetailPanel
