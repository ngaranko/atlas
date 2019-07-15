import {
  geoSearchType,
  dataSelectionType,
  detailPointType,
  panoramaPersonType,
  panoramaOrientationType,
  markerPointType,
} from './icons.constant'

const markerConfig = {
  [geoSearchType]: { requestFocus: true },
  [dataSelectionType]: {},
  [detailPointType]: { requestFocus: true },
  [panoramaPersonType]: { requestFocus: true },
  [panoramaOrientationType]: { requestFocus: true },
  [markerPointType]: {},
}
export default markerConfig
