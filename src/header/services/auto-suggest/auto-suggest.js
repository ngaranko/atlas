import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getAuthHeaders } from '../../../shared/services/auth/auth'

// Minimun length for typeahead query in backend is 3 characters
const MIN_QUERY_LENGTH = 3

/**
 * Orders the array by the object's labels in the order defined in the method
 * @param {Array} results
 * @returns {*[]}
 */
export const orderAutoSuggestResults = results => {
  // These strings correspond to the labels defined in the typeahead API.
  const order = ['Data', 'Publicaties', 'Datasets', 'Artikelen']

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
  let indexInTotal = -1

  const indexedCategories = categories.map(category => ({
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

  const sortedCategories = orderAutoSuggestResults(indexedCategories)

  return {
    count: numberOfResults,
    data: sortedCategories,
  }
}

function search(query) {
  const uri =
    query && query.length >= MIN_QUERY_LENGTH && `${SHARED_CONFIG.API_ROOT}typeahead?q=${query}`

  if (uri) {
    return fetch(uri, { headers: getAuthHeaders() })
      .then(response => response.json())
      .then(response => formatData(response))
  }
  return {}
}

export default search
