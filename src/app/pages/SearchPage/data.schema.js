const GET_ALL_DATA = `query($q: String!, $limit: Int, $types: [String!]) {
            dataSearch(q: $q, limit: $limit, types: $types) {
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
            }
          }`

const GET_INITIAL_DATA = `query($q: String!, $limit: Int, $types: [String!]) {
            dataSearch(q: $q, limit: $limit, types: $types) {
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
            }
          }`

export default {
  GET_ALL_DATA,
  GET_INITIAL_DATA,
}
