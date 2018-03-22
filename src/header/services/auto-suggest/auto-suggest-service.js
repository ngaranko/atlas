import apiUrl from '../../../shared/services/api';
import { getByUrl } from '../../../shared/services/api/api';

const ENDPOINT = 'typeahead';

function formatData(categories, query) {
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0);
  const indexedCategories = categories.map((category, i) => ({
    ...category,
    content: category.content.map((suggestion, j) => ({
      ...suggestion,
      index: `${i}-${j}`
    }))
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

function getSuggestionByIndex(searchResults, index) {
  let activeSuggestion;

  searchResults.forEach((category) => {
    category.content.forEach((suggestion) => {
      if (suggestion.index === index) {
        activeSuggestion = suggestion;
      }
    });
  });

  return activeSuggestion;
}

export default {
  search,
  getSuggestionByIndex
};
