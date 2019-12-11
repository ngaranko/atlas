const getCmsSearch = resolverName => `
query CmsSearch($q: String!, $limit: Int, $from: Int, $types: [String!]) {
        ${resolverName}(q: $q, input: {limit: $limit, from: $from, types: $types}) {
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
        }
    }
`
export const articleSearchQuery = getCmsSearch('articleSearch')
export const publicationSearchQuery = getCmsSearch('publicationSearch')
export const specialSearchQuery = getCmsSearch('specialSearch')
export const dataSearchQuery = `
  query DataSearch($q: String!, $limit: Int, $types: [String!]) {
    dataSearch(q: $q, input: {limit: $limit, types: $types}) {
      totalCount
      filters {
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
  }
`
export const datasetSearchQuery = `
  query DatasetSearch($q: String!, $limit: Int, $types: [DatasetSearchFilter!]) {
    datasetSearch(q: $q, input: { limit: $limit, filters: $types}) {
      totalCount
      filters {
        label
        type
        options {
          id
          count
          label
        }
      }
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
