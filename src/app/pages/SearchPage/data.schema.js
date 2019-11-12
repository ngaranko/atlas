export default `
dataSearch(q: $q, input: { limit: $limit, types: $types }) {
  totalCount
  results {
    type
    label
    count
    results {
      id
      label
      type
    }
  }
}`
