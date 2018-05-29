import searchIcon from './search-icon';
import { straatbeeldPersonIcon, straatbeeldOrientationIcon } from './straatbeeld-icon';
import detailIcon from './detail-icon';

export const geoSearchType = 'geoSearchType';
export const detailPointType = 'detailPointType';
export const straatbeeldPersonType = 'straatbeeldPersonType';
export const straatbeeldOrientationType = 'straatbeeldOrientationType';

const icons = {
  [geoSearchType]: searchIcon,
  [detailPointType]: detailIcon,
  [straatbeeldPersonType]: straatbeeldPersonIcon,
  [straatbeeldOrientationType]: straatbeeldOrientationIcon
};
export default icons;
