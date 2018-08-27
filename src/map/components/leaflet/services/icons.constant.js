import searchIcon from './search-icon';
import { straatbeeldPersonIcon, straatbeeldOrientationIcon } from './straatbeeld-icon';
import detailIcon from './detail-icon';
import dataSelectionIcon from './data-selection-icon';

export const geoSearchType = 'geoSearchType';
export const dataSelectionType = 'dataSelectionType';
export const detailPointType = 'detailPointType';
export const straatbeeldPersonType = 'straatbeeldPersonType';
export const straatbeeldOrientationType = 'straatbeeldOrientationType';

const icons = {
  [geoSearchType]: searchIcon,
  [dataSelectionType]: dataSelectionIcon,
  [detailPointType]: detailIcon,
  [straatbeeldPersonType]: straatbeeldPersonIcon,
  [straatbeeldOrientationType]: straatbeeldOrientationIcon
};
export default icons;
