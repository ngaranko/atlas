const cmsSearch = resolverName => `${resolverName}(q: $q, input: {limit: $limit, from: $from, types: $types}) {
  totalCount
  results {
      id
      label
      type
      date
      slug
      intro
      teaser
      dateLocale
      teaserImage
      coverImage
      specialType
      link {
          uri
      }
  }
}`

const getCmsSearch = resolverName => `
query CmsSearch($q: String!, $limit: Int, $from: Int, $types: [String!]) {
        ${cmsSearch(resolverName)}
    }
`
export const articleSearchQuery = getCmsSearch('articleSearch')
export const publicationSearchQuery = getCmsSearch('publicationSearch')
export const specialSearchQuery = getCmsSearch('specialSearch')

const filters = `
filters {
  options {
    id
    label
    count
  }
}
`

const dataSearch = `
  dataSearch(q: $q, input: {limit: $limit, types: $types}) {
    totalCount
    ${filters}
    results {
      type
      label
      count
      results {
        id
        label
        type
        subtype
      }
    }
  }
`

const datasetSearch = `
datasetSearch(q: $q, input: { limit: $limit, filters: $filters}) {
  totalCount
  ${filters}
  results {
    header
    description
    modified
    id
    tags
    formats {
      name
      count
    }
  }
}
`

export const dataSearchQuery = `
  query DataSearch($q: String!, $limit: Int, $types: [String!]) {
    ${dataSearch}
  }
`
export const datasetSearchQuery = `
  query DatasetSearch($q: String!, $limit: Int, $filters: [DatasetSearchFilter!]) {
    ${datasetSearch}
  }
`

export const searchQuery = `
query search($q: String!, $limit: Int, $from: Int, $types: [String!], $filters: [DatasetSearchFilter!]) {
  ${dataSearch}
  ${datasetSearch}
 ${cmsSearch('articleSearch')}
 ${cmsSearch('publicationSearch')}
 ${cmsSearch('specialSearch')}
}

`

export const categoryFilterBoxQuery = `
  query totalCountSearch($q: String!, $limit: Int) {
    datasetSearch(q: $q, input: {limit: $limit}) {
      totalCount
    }
    dataSearch(q: $q, input: {limit: $limit}) {
      totalCount
    }
    articleSearch(q: $q, input: {limit: $limit}) {
      totalCount
    }
    publicationSearch(q: $q, input: {limit: $limit}) {
      totalCount
    }
    specialSearch(q: $q, input: {limit: $limit}) {
      totalCount
    }
  }
`
