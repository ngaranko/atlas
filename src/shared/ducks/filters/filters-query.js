import { getFilters } from './filters';

const getFiltersString = (state) => {
  const filters = getFilters(state);
  const string = Object.entries(filters).map(([key, value]) => `${key}:${value}`);
  return string.join(',');
};

export default [
  {
    param: 'filters',
    selector: getFiltersString
  }
];
