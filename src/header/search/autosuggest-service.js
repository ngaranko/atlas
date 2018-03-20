import apiUrl from '../../shared/services/api';
import { getByUrl } from '../../shared/services/api/api';

function formatData(categories, query) {
  let suggestionIndex = 0;
  let numberOfResults = 0;
  if (categories.length > 0) {
    categories.forEach((category) => {
      category.content.map((suggestion) => {
        suggestionIndex += 1;
        suggestion.index = suggestionIndex;
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

export function autosuggestDataService(query) {
  return getByUrl(`${apiUrl}typeahead`, { q: query })
    .then((response) => formatData(response, query));
}

export function getSuggestionByIndex(searchResults, index) {
  var activeSuggestion;

  searchResults.forEach(function (category) {
    category.content.forEach(function (suggestion) {
      if (suggestion.index === index) {
        activeSuggestion = suggestion;
      }
    });
  });

  return activeSuggestion;
}
