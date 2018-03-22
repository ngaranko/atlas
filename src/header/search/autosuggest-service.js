import apiUrl from '../../shared/services/api';
import { getByUrl } from '../../shared/services/api/api';

const ENDPOINT = 'typeahead';

function formatData(categories, query) {
  let suggestionIndex = 0;
  let numberOfResults = 0;
  if (categories.length > 0) {
    categories.forEach((category) => {
      category.content.map((suggestion) => {
        suggestionIndex += 1;
        suggestion.index = suggestionIndex; // eslint-disable-line no-param-reassign
        numberOfResults += 1;

        return suggestion;
      });
    });
  }
  return {
    count: numberOfResults,
    data: categories,
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
