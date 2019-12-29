// TODO: Align format of filters for data with cms and datasets
const filters = `
  filters {
    type
    label
    filterType
    options {
      enumType
      id
      label
      count
    }
  }
`

const cmsSearch = resolverName => `${resolverName}(q: $q, input: {limit: $limit, from: $from, types: $types, filters: $filters}) {
  totalCount
  ${filters}
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
  query CmsSearch($q: String!, $limit: Int, $from: Int, $types: [String!], $filters: [FilterInput!]) {
    ${cmsSearch(resolverName)}
  }
`
export const articleSearchQuery = getCmsSearch('articleSearch')
export const publicationSearchQuery = getCmsSearch('publicationSearch')
export const specialSearchQuery = getCmsSearch('specialSearch')

const dataSearch = `
  dataSearch(q: $q, input: {limit: $limit, from: $from, types: $types}) {
    totalCount
    filters {
      type
      label
      options {
        id
        label
        count
      }
    }
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

export const datasetSearch = `
  datasetSearch(q: $q, input: { limit: $limit, from: $from, filters: $filters}) {
    totalCount
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
  query DataSearch($q: String!, $limit: Int, $from: Int, $types: [String!]) {
    ${dataSearch}
  }
`
export const datasetSearchQuery = `
  query DatasetSearch($q: String!, $limit: Int, $from: Int, $filters: [FilterInput!]) {
    ${datasetSearch}
  }
`

export const searchQuery = `
  query search($q: String!, $limit: Int, $from: Int, $types: [String!], $filters: [FilterInput!]) {
    ${cmsSearch('specialSearch')}
    ${dataSearch}
    ${cmsSearch('publicationSearch')}
    ${datasetSearch}
    ${cmsSearch('articleSearch')}
  }
`

export const datasetFiltersQuery = `
  query DatasetFilters($q: String!) {
    getDatasetFilters(q: $q) {
      ${filters}
    }
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
