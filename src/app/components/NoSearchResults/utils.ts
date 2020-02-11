// eslint-disable-next-line import/prefer-default-export
export function formatNoResultsMessage(query: string, label: string) {
  if (query.trim().length === 0) {
    return 'Er zijn geen resultaten gevonden.'
  }

  if (label === '') {
    return `Er zijn geen resultaten gevonden met '${query}'.`
  }

  return `Er zijn geen resultaten gevonden met '${query}' binnen de categorie '${label}'.`
}
