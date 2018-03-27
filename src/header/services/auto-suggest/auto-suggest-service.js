import apiUrl from '../../../shared/services/api';
import { getByUrl } from '../../../shared/services/api/api';

const ENDPOINT = 'typeahead';

function formatData(categories, query) {
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0);
  let indexInTotal = -1;
  const indexedCategories = categories.map((category) => ({
    ...category,
    content: category.content.map((suggestion) => {
      indexInTotal += 1;
      return {
        ...suggestion,
        index: indexInTotal
      };
    })
  }));

  return {
    count: numberOfResults,
    data: indexedCategories,
    query
  };
}

function search(query) {
  return getByUrl(`${apiUrl}${ENDPOINT}`, { q: query })
    .then((response) => formatData(response, query));
}

export default {
  search
};
