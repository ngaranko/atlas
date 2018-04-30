import searchIcon from './search-icon';
import { straatbeeldPersonIcon, straatbeeldOrientationIcon } from './straatbeeld-icon';

export const geoSearch = 'straatbeeldPerson';
export const straatbeeldPerson = 'straatbeeldPerson';
export const straatbeeldOrientation = 'straatbeeldOrientation';

const getIconByType = (type) => {
  switch (type) {
    case straatbeeldPerson:
      return straatbeeldPersonIcon;

    case straatbeeldOrientation:
      return straatbeeldOrientationIcon;

    default:
      return searchIcon;
  }
};

export default getIconByType;
