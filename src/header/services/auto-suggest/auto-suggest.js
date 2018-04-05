import apiUrl from '../../../shared/services/api';
import { getAuthHeaders } from '../../../shared/services/auth/auth';

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
        index: indexInTotal,
        category: category.label
      };
    })
  }));

  return {
    count: numberOfResults,
    data: indexedCategories
  };
}

function search(query) {
  const uri = `${apiUrl}${ENDPOINT}?q=${query}`;
  return fetch(uri, { headers: getAuthHeaders() })
    .then((response) => response.json())
    .then((response) => formatData(response));
}

export default search;
