import React from 'react'
import PropTypes from 'prop-types'

import { endpointTypes } from '../../services/map-detail'
import fieldsByEndPointType from '../../services/map-detail-fields'

import MapDetailPanel from './MapDetailPanel'

const MapDetailResult = ({ panoUrl, result, onMaximize, onPanoPreviewClick }) => {
  const endpointType =
    result.endpointType === endpointTypes.adressenVerblijfsobject
      ? endpointTypes.adressenNummeraanduiding
      : result.endpointType

  const mapDetailData = fieldsByEndPointType[endpointType](result)

  return (
    <MapDetailPanel
      result={mapDetailData}
      onPanoPreviewClick={onPanoPreviewClick}
      onMaximize={onMaximize}
      panoUrl={panoUrl}
    />
  )
}

MapDetailResult.defaultProps = {
  panoUrl: '',
  result: {},
}

MapDetailResult.propTypes = {
  panoUrl: PropTypes.string,
  onMaximize: PropTypes.func.isRequired,
  onPanoPreviewClick: PropTypes.func.isRequired,
  result: PropTypes.shape({}),
}

export default MapDetailResult
