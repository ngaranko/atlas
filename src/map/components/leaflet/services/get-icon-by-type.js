import searchIcon from './search-icon';
import { straatbeeldPersonIcon, straatbeeldOrientationIcon } from './straatbeeld-icon';
import detailIcon from './detail-icon';

export const geoSearch = 'straatbeeldPerson';
export const detail = 'detail';
export const straatbeeldPerson = 'straatbeeldPerson';
export const straatbeeldOrientation = 'straatbeeldOrientation';

const getIconByType = (type) => {
  switch (type) {
    case straatbeeldPerson:
      return straatbeeldPersonIcon;

    case straatbeeldOrientation:
      return straatbeeldOrientationIcon;

    case detail:
      return detailIcon;

    default:
      return searchIcon;
  }
};

export default getIconByType;
