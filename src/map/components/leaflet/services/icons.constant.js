import searchIcon from './search-icon';
import { panoramaPersonIcon, panoramaOrientationIcon } from './panorama-icon';
import detailIcon from './detail-icon';
import dataSelectionIcon from './data-selection-icon';
import locationIcon from './location-icon';

export const geoSearchType = 'geoSearchType';
export const dataSelectionType = 'dataSelectionType';
export const detailPointType = 'detailPointType';
export const panoramaPersonType = 'panoramaPersonType';
export const panoramaOrientationType = 'panoramaOrientationType';
export const markerPointType = 'markerPointType';

const icons = {
  [geoSearchType]: searchIcon,
  [dataSelectionType]: dataSelectionIcon,
  [detailPointType]: detailIcon,
  [panoramaPersonType]: panoramaPersonIcon,
  [panoramaOrientationType]: panoramaOrientationIcon,
  [markerPointType]: locationIcon
};
export default icons;
