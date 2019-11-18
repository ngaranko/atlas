export const MAX_RESULTS = 50

export const cmsSearchQuery = `
    query CmsSearch($q: String!, $limit: Int, $from: Int, $types: [String!]) {
        cmsSearch(q: $q, input: {limit: $limit, from: $from, types: $types}) {
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
                    body
                    dateLocale
                    teaserImage
                    coverImage
                    link {
                        uri
                    }
                }
            }
        }
    }
`

export default cmsSearchQuery
