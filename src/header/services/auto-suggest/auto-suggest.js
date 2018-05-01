import apiUrl from '../../../shared/services/api';
import { getAuthHeaders } from '../../../shared/services/auth/auth';

function formatData(categories) {
console.log('formatData')
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0);
console.log('formatted', numberOfResults)
  let indexInTotal = -1;
  const indexedCategories = categories.map((category) => ({
    ...category,
    content: category.content.map((suggestion) => {
      indexInTotal += 1;
      return {
        category: category.label,
        index: indexInTotal,
        label: suggestion._display,
        uri: suggestion.uri
      };
    })
  }));
  return {
    count: numberOfResults,
    data: indexedCategories
  };
}

function search(query) {
  console.log('query', query)
  const uri = `${apiUrl}typeahead?q=${query}`;
  return fetch(uri, { headers: getAuthHeaders() })
    .then((response) => {
      console.log('response', response.json())
      return response.json()
    })
    .then((response) => formatData(response));
}

export default search;
