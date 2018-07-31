import {
  geoSearchType,
  dataSelectionType,
  detailPointType,
  straatbeeldPersonType,
  straatbeeldOrientationType
} from './icons.constant';

const markerConfig = {
  [geoSearchType]: { requestFocus: true },
  [dataSelectionType]: {},
  [detailPointType]: { requestFocus: true },
  [straatbeeldPersonType]: { requestFocus: true },
  [straatbeeldOrientationType]: { requestFocus: true }
};
export default markerConfig;
