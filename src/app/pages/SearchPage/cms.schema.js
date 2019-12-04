export default `
cmsSearch(q: $q, input: {limit: $limit, types: $types}) {
  totalCount
  results {
    type
    label
    count
    results {
      id
      label
      type
      date
      slug
      dateLocale
      teaserImage
      coverImage
      link {
        uri
      }
    }
  }
}
`
