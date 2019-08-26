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
      {result.notifications &&
        result.notifications.length &&
        result.notifications.map(
          notification =>
            notification.value && (
              <Notification canClose={!!notification.canClose} level={notification.level}>
                {notification.value}
              </Notification>
            ),
        )}

      <ul className="map-detail-result__list">
        {console.log(result.items)}

        {result.items.lenght &&
          result.items.map(item =>
            item.value && Array.isArray(item.value) ? (
              <>
                <h4 className="map-detail-result__category-title">{item.label}</h4>
                {item.value.map(subItem => (
                  <MapDetailResultItem
                    hasMultiline={!!subItem.multiLine}
                    link={subItem.link ? subItem.link : false}
                    label={subItem.label}
                    value={subItem.value}
                    status={subItem.status}
                  />
                ))}
              </>
            ) : (
              item.value && (
                <MapDetailResultItem
                  hasMultiline={!!item.multiLine}
                  link={item.link ? item.link : false}
                  label={item.label}
                  value={item.value}
                  status={item.status}
                />
              )
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
