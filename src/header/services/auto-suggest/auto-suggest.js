import apiUrl from '../../../shared/services/api';
import { getByUrl } from '../../../shared/services/api/api';

const ENDPOINT = 'typeahead';

function formatData(categories) {
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0);
  let indexInTotal = -1;
  const indexedCategories = categories.map((category) => ({
    ...category,
    content: category.content.map((suggestion) => {
      indexInTotal += 1;
      return {
        uri: suggestion.uri,
        label: suggestion._display,
        index: indexInTotal
      };
    })
  }));

  return {
    count: numberOfResults,
    data: indexedCategories
  };
}

function search(query) {
  return getByUrl(`${apiUrl}${ENDPOINT}`, { q: query })
    .then((response) => formatData(response));
}

export default search;
