import { getAuthHeaders } from '../../../shared/services/auth/auth'

// Minimun length for typeahead query in backend is 3 characters
const MIN_QUERY_LENGTH = 3

// These strings correspond to the labels defined in the typeahead API.
export const LABELS = {
  PUBLICATIONS: 'Publicaties',
  DATASETS: 'Datasets',
  ARTICLES: 'Artikelen',
  DATA: 'Data',
  SPECIALS: 'In Beeld',
}

/**
 * Orders the array by the object's labels in the order defined the LABELS const
 * @param {Array} results
 * @returns {*[]}
 */
export const orderAutoSuggestResults = results => {
  const order = Object.values(LABELS)

  const dataPart = results.filter(category => !order.includes(category.label))
  const orderedPart = order.reduce((acc, label) => {
    const res = results.filter(category => category.label === label)
    if (res) {
      return [...acc, ...res]
    }
    return acc
  }, [])
  return [...dataPart, ...orderedPart]
}

function formatData(categories) {
  const numberOfResults = categories.reduce((acc, category) => acc + category.content.length, 0)
  const sortedCategories = orderAutoSuggestResults(categories)

  let indexInTotal = -1

  const indexedCategories = sortedCategories.map(category => ({
    ...category,
    content: category.content.map(suggestion => {
      indexInTotal += 1
      return {
        category: category.label,
        index: indexInTotal,
        label: suggestion._display,
        uri: suggestion.uri,
      }
    }),
  }))

  return {
    count: numberOfResults,
    data: indexedCategories,
  }
}

function search(query) {
  const uri =
    query &&
    query.length >= MIN_QUERY_LENGTH &&
    `${process.env.API_ROOT}typeahead?q=${typeof query === 'string' ? query.toLowerCase() : ''}` // Todo: temporary fix, real fix: DP-7365

  if (uri) {
    return fetch(uri, { headers: getAuthHeaders() })
      .then(response => response.json())
      .then(response => formatData(response))
  }
  return {}
}

export default search
